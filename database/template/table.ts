/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable node/no-unpublished-import */
import { MigrationFn } from 'umzug';
import { Sequelize } from 'sequelize/types/lib/sequelize';
// import { DataTypes } from 'sequelize/types';
import defaultCloumns from '../utils/default-cloumns';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().createTable('[tableName]', {
    ...defaultCloumns,
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  return await sequelize.getQueryInterface().dropTable('[tableName]');
};
