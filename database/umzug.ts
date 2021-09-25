import { Umzug, SequelizeStorage } from 'umzug';
// eslint-disable-next-line node/no-unpublished-import
import { Sequelize } from 'sequelize';
// config 加载
import config from './config.json';
import { get, snakeCase, replace } from 'lodash';
import path from 'path';
import fs from 'fs';

const rtlEnv = process.env.NODE_ENV;
const sequelizeConfig: any = get(config, rtlEnv || 'development');
console.log(`[umzug]:db:${sequelizeConfig.database}`);
const sequelize = new Sequelize(sequelizeConfig);

/**
 * 默认模版替换
 * @param filepath 路径
 * @returns
 */
const findTemplate = (filepath: string) => {
  const temp = fs
    .readFileSync(path.join('database/template/table.ts'))
    .toString();
  const names = filepath.split('.');
  const name = snakeCase(names[names.length - 2]);
  return replace(temp, /\[tableName\]/g, name);
};

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  create: {
    template: filepath => [[filepath, findTemplate(filepath)]],
    folder: path.join('database/migrations/'),
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
