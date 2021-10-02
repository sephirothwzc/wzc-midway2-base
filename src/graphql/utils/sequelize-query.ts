/* eslint-disable node/no-unpublished-import */
import { Provide } from '@midwayjs/decorator';
import {
  camelCase,
  isArray,
  startsWith,
  isObject,
  snakeCase,
  set,
} from 'lodash';
import {
  FindAttributeOptions,
  Includeable,
  Op,
  Sequelize,
  WhereOptions,
} from 'sequelize';

export type Include = {
  model: string;
  as: string;
  where: any;
  attributes: any[];
  required: boolean;
  right: boolean;
  limit: number;
  include: Include[];
};

@Provide()
export class SequelizeQuery {
  /**
   * operatorsAliases 已经弃用改成手动处理
   * @param param
   * @returns
   */
  private setOp(param: any) {
    const res = isArray(param) ? [] : {};
    for (const [k, v] of Object.entries(param)) {
      res[startsWith(k, '_') ? Op[k.substring(1, k.length)] : k] =
        isObject(v) && !(v instanceof Date) ? this.setOp(v) : v;
    }
    return res;
  }

  where(param: any): WhereOptions {
    if (!param || !isObject(param)) {
      return param;
    }
    return this.setOp(param);
  }
  attributes(param: string[]): FindAttributeOptions {
    return param.map(p => {
      if (!p.includes(':')) {
        return camelCase(p);
      }
      const list = p.split(/:/);
      if (!isArray(list) || list.length !== 3) {
        throw "attributes must string|Array<string>['COUNT','id','total']";
      }
      return [
        Sequelize.fn(list[0], Sequelize.col(snakeCase(list[1]))),
        camelCase(list[2]),
      ];
    });
  }
  include(param: Include[]): Includeable[] {
    const result = param.map(p => {
      const optionInclude = {};
      p.model && set(optionInclude, 'model', p.model);
      p.as && set(optionInclude, 'as', p.as);
      p.where && set(optionInclude, 'where', this.where(p.where));
      p.attributes &&
        set(optionInclude, 'attributes', this.attributes(p.attributes));
      p.required !== undefined && set(optionInclude, 'required', p.required);
      p.right && set(optionInclude, 'right', p.right);
      p.limit && set(optionInclude, 'limit', p.limit);
      p.include && set(optionInclude, 'include', this.include(p.include));
      return optionInclude;
    });
    return result;
  }
  group(param: string[]): string[] {
    return param.map(p => snakeCase(p));
  }
}
