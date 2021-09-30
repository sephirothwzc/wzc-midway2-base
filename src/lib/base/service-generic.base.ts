/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:16:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-12-02 19:12:49
 */
import { Provide, Inject, Config } from '@midwayjs/decorator';
import { CreateOptions, Transaction } from 'sequelize';
import { SnowFlake } from '../utils/flake-id';
import Bb from 'bluebird';
import { camelCase, get, keys, set } from 'lodash';
import { Model } from 'sequelize-typescript';
import { ILogger } from '@midwayjs/logger';
import QueryListParam from '../../graphql/utils/query-list-param.gql';

@Provide()
export abstract class ServiceGenericBase<T extends Model> {
  @Inject()
  snowFlake: SnowFlake;

  @Config()
  serviceParam: { defalutLimit: number };

  @Inject()
  logger: ILogger;

  /**
   * 参数处理 where _ 转 Op
   * @param param
   */
  private findParamUtils(param: QueryListParam, oneLimit = true) {
    const squelizeParam = {
      order: param?.order || [['id', 'DESC']],
      limit: param?.limit || this.serviceParam.defalutLimit,
      offset: param?.offset,
      where: param?.where,
    };

    oneLimit && set(squelizeParam, 'limit', get(param, 'limit', 1000));
    oneLimit &&
      get(param, 'offset') &&
      set(squelizeParam, 'offset', param.offset);
    get(param, 'where') &&
      set(squelizeParam, 'where', this.sequelizeQuery.where(param.where));
    return squelizeParam;
  }

  /**
   * @deprecated
   */
  async findList(param: IQueryListParam): Promise<T[]> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.findAll(squelizeParam) as any;
  }

  async findAll(param: IQueryListParam): Promise<T[]> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.findAll(squelizeParam) as any;
  }

  async findOne<T>(param: IQueryListParam): Promise<T> {
    const squelizeParam = this.findParamUtils(param, false);
    return this.Model.findOne(squelizeParam) as any;
  }

  async findCount(param: IQueryListParam): Promise<number> {
    const squelizeParam = this.findParamUtils(param);
    return this.Model.count(squelizeParam);
  }

  async findByPk<T>(id: string): Promise<T> {
    return this.Model.findByPk(id) as any;
  }

  /**
   * 记录操作人id
   * @param param
   */
  hookSave(param: T) {
    const id = get(this.auth, 'id');
    set(param, BASEMODEL.UPDATEDID, id);
    param.id || param.createdId || set(param, BASEMODEL.CREATEDID, id);
  }

  /**
   * 是否启用事务
   * @param param
   */
  private enableTransaction(options?: { hookName?: HooksName }): boolean {
    if (options) {
      return this.Model.hasHook(options.hookName);
    }
    return false;
  }

  /**
   * sequelize save
   * @param param
   * @param must
   */
  private async ormUpdate(param: T, t?: Transaction): Promise<T> {
    return await this.Model.findByPk(param.id, { transaction: t }).then(
      (result: T) => {
        if (!result) {
          throw new Error(`[${param.id}]不存在！`);
        }
        this.setChange(result, param);
        // 子表更新
        return result.save({ transaction: t });
      }
    );
  }

  /**
   * update
   * @param param
   */
  private async update(param: T): Promise<T> {
    const tran = this.enableTransaction({
      hookName: HooksName.beforeUpdate,
    });
    let result: T;
    if (tran) {
      result = await this.db.sequelize.transaction((t: Transaction) => {
        return this.ormUpdate(param, t);
      });
    } else {
      result = await this.ormUpdate(param);
    }
    return result;
  }

  /**
   * find operation.incloud
   * @param param
   * @returns
   */
  async findCreateOptions(
    param: T
  ): Promise<{ include?: [any]; transaction?: any; validate?: boolean }> {
    const context: IApplicationContext =
      this.ctx.requestContext.applicationContext;
    const has: boolean = context.registry.identifiers.includes(
      `${camelCase(this.Model.name)}.createOptions`
    );
    if (!has) {
      return {};
    }
    const createOptions: (param: T) => {
      include?: [any];
      transaction?: any;
      validate?: boolean;
    } = await context.getAsync(`${camelCase(this.Model.name)}.createOptions`);
    return createOptions(param);
  }

  private setChange(resultModel: any, param: T) {
    keys(param).forEach(k => {
      resultModel.set(k, param[k]);
    });
  }

  /**
   * 保存
   * @param param model
   */
  async save(param: T): Promise<string> {
    const model = await this.saveReturnObj(param);
    return model.id;
  }

  /**
   * 保存返回对象
   * @param param
   * @returns
   */
  async saveReturnObj(param: T): Promise<T> {
    this.hookSave(param);
    // 修改
    if (param.id) {
      return this.update(param);
    }
    return this.create(param);
  }

  /**
   * 新增
   * @param param
   * @returns
   */
  async create(param: T, useOptions?: CreateOptions): Promise<T> {
    // 获取createOptions
    const options = await this.findCreateOptions(param);
    const tran = this.enableTransaction({
      hookName: HooksName.beforeCreate,
    });
    // 默认事务
    if ((!useOptions && options.include && !options.transaction) || tran) {
      return (await this.db.sequelize.transaction((t: Transaction) => {
        return this.Model.create(param, {
          ...options,
          transaction: t,
        });
      })) as T;
    }
    return (await this.Model.create(param, {
      ...options,
      ...useOptions,
    })) as T;
  }

  /**
   * create 用高阶 transaction
   * @param fun
   * @param useOptions
   * @returns
   */
  public async useTransaction(
    fun: (t: Transaction) => any,
    useOptions?: CreateOptions
  ) {
    if (useOptions) {
      return await fun(useOptions.transaction);
    }
    return await this.db.sequelize.transaction(async (t: Transaction) => {
      return await fun(t);
    });
  }

  /**
   * 批量插入
   * @param param
   * @returns
   */
  async bulkCreate(param: Array<T>): Promise<Array<T>> {
    param.forEach(p => this.hookSave(p));
    return this.Model.bulkCreate(param) as any;
  }

  /**
   * 批量修改 非事务
   * @param param
   */
  async bulkUpdate(param: Array<T>): Promise<Array<T>> {
    return Bb.map(param, p => this.ormUpdate(p));
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
    return this.Model.destroy({ where, limit, force });
  }

  /**
   * 根据id删除
   * @param id
   * @returns
   */
  async destroyById(id: string) {
    const model: T = (await this.Model.findByPk(id)) as T;
    if (!model) {
      throw new Error(`[${id}]不存在，请确认！`);
    }
    return model
      .destroy()
      .then(() => {
        return id;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}

enum HooksName {
  beforeUpdate = 'beforeUpdate',
  beforeCreate = 'beforeCreate',
  beforeBulkDestroy = 'beforeBulkDestroy',
  beforeDestroy = 'beforeDestroy',
}
