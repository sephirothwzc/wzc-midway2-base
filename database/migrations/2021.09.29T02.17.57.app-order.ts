/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable node/no-unpublished-import */
import { MigrationFn } from 'umzug';
import { Sequelize } from 'sequelize/types/lib/sequelize';
import { DataTypes } from 'sequelize';
import defaultCloumns, { references } from '../utils/default-cloumns';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().createTable('app_order', {
    ...defaultCloumns,
    app_user_id: {
      type: DataTypes.STRING(50),
      references: references('app_user'),
      comment: '用户id',
    },
    order_amount: {
      type: DataTypes.INTEGER,
      comment: '订单金额分',
    },
    other_id: {
      type: DataTypes.STRING(50),
      comment: '三方支付订单id',
    },
    msg_id: {
      type: DataTypes.STRING(200),
      comment: '消息队列id',
    },
    status: {
      type: DataTypes.STRING(20),
      comment: '订单状态',
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().dropTable('app_order');
};
