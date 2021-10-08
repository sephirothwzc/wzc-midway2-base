import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as sequelize from '@midwayjs/sequelize';
/**
 * 必须为*引用 shit
 */
import * as GraphQL from 'apollo-server-midway';
import { IMidwayKoaApplication } from '@midwayjs/koa';

@Configuration({
  imports: [GraphQL, sequelize],
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
