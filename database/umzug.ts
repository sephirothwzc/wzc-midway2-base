import { Umzug, SequelizeStorage } from 'umzug';
// eslint-disable-next-line node/no-unpublished-import
import { Sequelize } from 'sequelize';
// config 加载
import config from './config.json';
import { get } from 'lodash';
import path from 'path';

const rtlEnv = process.env.NODE_ENV;
const sequelizeConfig: any = get(config, rtlEnv || 'development');
console.log(sequelizeConfig);
const sequelize = new Sequelize(sequelizeConfig);

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  create: {
    // template: filepath => [
    //   [filepath, fs.readFileSync('path/to/your/template/file').toString()],
    // ],
    folder: path.join('database/migrations/'),
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
