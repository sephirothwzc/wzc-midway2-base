// eslint-disable-next-line node/no-unpublished-import
import Sequelize from 'sequelize';

const { DATE, STRING, INTEGER } = Sequelize;

export default {
  id: { type: STRING(50), primaryKey: true },
  // Creating two objects with the same value will throw an error. The unique property can be either a
  // boolean, or a string. If you provide the same string for multiple columns, they will form a
  created_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
    comment: '创建时间',
  },
  created_id: {
    type: STRING(50),
    defaultValue: '',
    comment: '创建人id',
  },
  updated_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
    comment: '修改时间',
  },
  updated_id: {
    type: STRING(50),
    comment: '修改人id',
  },
  deleted_at: { type: DATE, comment: '删除时间' },
  deleted_id: {
    type: STRING(50),
    comment: '删除人id',
  },
  business_code: {
    type: STRING(500),
    comment: '业务编码权限用',
  },
  remark: {
    type: STRING(500),
    comment: '备注',
  },
  version: {
    type: INTEGER,
    comment: 'BaseTable.version',
  },
};

export const references = (tableName: string, keyName = 'id') => {
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }
  return {
    model: {
      tableName,
    },
    keyName,
  };
};
