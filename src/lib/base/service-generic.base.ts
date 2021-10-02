/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:16:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-12-02 19:12:49
 */
import { Provide, Inject, Config } from '@midwayjs/decorator';
import { Transaction } from 'sequelize';
import { SnowFlake } from '../utils/flake-id';
import Bb from 'bluebird';
import { mapKeys, set } from 'lodash';
import { ILogger } from '@midwayjs/logger';
import QueryListParam from '../../graphql/utils/query-list-param.gql';
import { SequelizeQuery } from '../../graphql/utils/sequelize-query';
import { Model } from 'sequelize-typescript';
import { AuthToken } from '../utils/auth-token';

export const KEY = 'id';
export const UPDATEDID = 'updatedId';
export const CREATEDID = 'createdId';

export type ModelStatic = typeof Model & {
  new (): Model;
};

@Provide()
export default abstract class ServiceGenericBase<T extends Model> {
  /**
   * 获取当前model 泛型对象
   */
  abstract get Entity(): ModelStatic;

  @Inject()
  authToken: AuthToken;

  @Inject()
  snowFlake: SnowFlake;

  @Config()
  serviceParam: { defalutLimit: number };

  @Inject()
  sequelizeQuery: SequelizeQuery;

  /**
   * context 级别
   */
  @Inject()
  logger: ILogger;

  /**
   * 权限
   */
  get auth() {
    return this.authToken.Auth;
  }

  /**
   * 参数处理 where _ 转 Op
   * @param param
   */
  private findParamUtils(param: QueryListParam) {
    const squelizeParam = {
      order: param?.order || [['id', 'DESC']],
      limit: param?.limit || this.serviceParam.defalutLimit,
      offset: param?.offset,
      where: this.sequelizeQuery.where(param?.where),
    };
    return squelizeParam;
  }

  /**
   * @deprecated
   */
  async findList(param: QueryListParam): Promise<Array<T>> {
    const squelizeParam = this.findParamUtils(param);
    return this.Entity.findAll(squelizeParam) as any;
  }

  async findAll(param: QueryListParam): Promise<Array<T>> {
    const squelizeParam = this.findParamUtils(param);
    return this.Entity.findAll(squelizeParam) as any;
  }

  async findOne(param: QueryListParam): Promise<T> {
    const squelizeParam = this.findParamUtils(param);
    return this.Entity.findOne(squelizeParam) as any;
  }

  async findCount(param: QueryListParam): Promise<number> {
    const squelizeParam = this.findParamUtils(param);
    return this.Entity.count(squelizeParam);
  }

  async findByPk<T>(id: string): Promise<T> {
    return this.Entity.findByPk(id) as any;
  }

  /**
   * 记录操作人id
   * @param param
   */
  hookSave(param: T): T {
    set(param, UPDATEDID, this.auth.id);
    param.get(KEY) ||
      param.get(CREATEDID) ||
      param.set(CREATEDID, this.auth.id);
    return param;
  }

  /**
   * sequelize save
   * @param param
   * @param must
   */
  private async update(param: T, t?: Transaction): Promise<T> {
    return await this.Entity.findByPk(param.id, { transaction: t }).then(
      (result: T) => {
        if (!result) {
          throw new Error(`[${param.get(KEY)}]不存在！`);
        }
        this.setChange(result, param);
        // 子表更新
        return result.save({ transaction: t });
      }
    );
  }

  private setChange(resultModel: T, param: T) {
    mapKeys(param, (value, key) => resultModel.set(key, value));
  }

  /**
   * 保存
   * @param param model
   */
  async save(param: T, t?: Transaction): Promise<T> {
    this.hookSave(param);
    return param?.id ? this.update(param, t) : this.create(param, t);
  }

  /**
   * 新增
   * @param param
   * @returns
   */
  async create(param: T, t?: Transaction): Promise<T> {
    return this.Entity.create(param, {
      transaction: t,
    }) as any;
  }

  /**
   * create 用高阶 transaction
   * @param fun
   * @param useOptions
   * @returns
   */
  public async useTransaction(
    fun: (t: Transaction) => any,
    useOptions?: { transaction: Transaction }
  ) {
    if (useOptions) {
      return await fun(useOptions.transaction);
    }
    return await this.Entity.sequelize.transaction(async (t: Transaction) => {
      return await fun(t);
    });
  }

  /**
   * 批量插入
   * @param param
   * @returns
   */
  async bulkCreate(param: Array<T>): Promise<Array<T>> {
    const value = param.map(p => this.hookSave(p));
    return this.Entity.bulkCreate(value) as any;
  }

  /**
   * 批量修改 非事务
   * @param param
   */
  async bulkUpdate(param: Array<T>): Promise<Array<T>> {
    return Bb.map(param, p => this.update(p));
  }

  /**
   * 批量保存,新增or修改
   * @param param
   */
  async bulkSave(param: Array<T>): Promise<Array<T>> {
    const addList = param.filter(p => !p.id);
    const updList = param.filter(p => p.id);
    const { add, upd } = await Bb.props({
      add: this.bulkCreate(addList),
      upd: this.bulkUpdate(updList),
    });
    return [...upd, ...add];
  }

  /**
   * 自定义删除
   * @param where
   * @param limit
   * @param force
   * @returns
   */
  async destroy(where: any, limit: number, force = false): Promise<number> {
    return this.Entity.destroy({ where, limit, force });
  }

  /**
   * 根据id删除
   * @param id
   * @returns
   */
  async destroyById(id: string): Promise<void> {
    return this.Entity.findByPk(id)
      .then(result => result.destroy())
      .catch(error => {
        throw error;
      });
  }
}
