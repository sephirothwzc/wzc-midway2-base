import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
// import { Application } from 'egg';
import { join } from 'path';
import sequelize from '@midwayjs/sequelize';
import GraphQL from 'apollo-server-midway';
import { IMidwayKoaApplication } from '@midwayjs/koa';

@Configuration({
  imports: [sequelize, GraphQL],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: IMidwayKoaApplication;

  async onReady() {
    this.app.use(
      // Express 下的命名空间：graphql:GraphQLExpressMiddleware
      await this.app.generateMiddleware('graphql:GraphQLKoaMiddleware')
    );
  }
}
