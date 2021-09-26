/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable node/no-unpublished-import */
import { MigrationFn } from 'umzug';
import { Sequelize } from 'sequelize/types/lib/sequelize';
import { DataTypes } from 'sequelize';
import defaultCloumns from '../utils/default-cloumns';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().createTable('app_user', {
    ...defaultCloumns,
    phone: {
      type: DataTypes.STRING(20),
      comment: '手机号唯一[unique]',
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(50),
      comment: '昵称唯一[unique]',
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      comment: '密码',
    },
    openid: {
      type: DataTypes.STRING(100),
      comment: '微信openid',
    },
    unionid: {
      type: DataTypes.STRING(100),
      comment: '微信unionid',
    },
    hdader_img: {
      type: DataTypes.STRING(200),
      comment: '头像',
    },
    real_name: {
      type: DataTypes.STRING(200),
      comment: '真实姓名',
    },
    birthday: {
      type: DataTypes.DATE,
      comment: '生日',
    },
    gender: {
      type: DataTypes.DATE,
      comment: '性别',
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'normal',
      comment: '状态normal正常black拉黑',
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().dropTable('app_user');
};
