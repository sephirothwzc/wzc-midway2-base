import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { CreateGraphQLMiddlewareOption } from 'apollo-server-midway';
import path from 'path';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.jwt = {
    secret: '!QAZ2wsx#EDC',
  };

  // #region graphql
  const graphql: CreateGraphQLMiddlewareOption = {
    schema: {
      resolvers: [path.resolve(appInfo.baseDir, 'src/resolver/*')],
    },
    path: '/graphql',
  };

  config.graphql = graphql;
  // #endregion

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632542095077_6333';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };

  config.serviceParam = {
    defaultLimit: 1000,
  };

  return config;
};
