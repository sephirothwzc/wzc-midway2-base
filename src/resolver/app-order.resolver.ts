import { Provide, Inject } from '@midwayjs/decorator';
import Bb from 'bluebird';
import { Resolver, Query, Arg, Int, Mutation, ID } from 'type-graphql';
import {
  AppOrder,
  AppOrderSaveIn,
  AppOrderList,
} from '../graphql/app-order/app-order.gql';
import QueryListParam from '../graphql/utils/query-list-param.gql';
import { AppOrderService } from '../service/app-order.service';
import { AppOrderEntity } from '../lib/model/app-order.entity';

@Provide()
@Resolver(() => AppOrder)
export default class AppOrderResolver {
  @Inject()
  appOrderService: AppOrderService;

  @Query(type => Int)
  async appOrderCount(
    @Arg('param', () => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<number> {
    return this.appOrderService.findCount(param);
  }

  @Query(returns => AppOrderList, { nullable: true })
  async appOrderList(
    @Arg('param', type => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<{
    list: AppOrderEntity[];
    count: number;
  }> {
    return Bb.props({
      list: this.appOrderService.findAll(param),
      count: this.appOrderService.findCount(param),
    });
  }

  @Query(returns => AppOrder, { nullable: true })
  async appOrder(@Arg('id', type => ID) id: string): Promise<AppOrderEntity> {
    return this.appOrderService.findByPk(id);
  }
  @Query(returns => [AppOrder])
  async appOrderAll(
    @Arg('param', type => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<Array<AppOrder>> {
    return this.appOrderService.findAll(param) as any;
  }

  @Mutation(returns => AppOrder, {
    name: 'appOrder',
  })
  async appOrderSave(
    @Arg('param', type => AppOrderSaveIn) param: AppOrderEntity
  ): Promise<AppOrderEntity> {
    return this.appOrderService.save(param);
  }

  @Mutation(returns => [AppOrder], { nullable: true })
  async appOrderBulk(
    @Arg('param', type => [AppOrderSaveIn]) param: [AppOrderEntity]
  ): Promise<AppOrderEntity[]> {
    return this.appOrderService.bulkSave(param);
  }

  @Mutation(returns => String, { nullable: true })
  async appOrderDestroy(@Arg('id', type => ID) id: string): Promise<void> {
    return this.appOrderService.destroyById(id);
  }
}
