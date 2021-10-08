import { Provide, Inject } from '@midwayjs/decorator';
import Bb from 'bluebird';
import { Resolver, Query, Arg, Int, Mutation, ID } from 'type-graphql';
import AppUser, {
  AppUserSaveIn,
  AppUserList,
} from '../graphql/app-user/app-user.gql';
import QueryListParam from '../graphql/utils/query-list-param.gql';
import { AppUserService } from '../service/app-user.service';
import { AppUser as AppUserEntity } from '../lib/model/app-user.entity';

@Provide()
@Resolver(() => AppUser)
export default class AppUserResolver {
  @Inject()
  appUserService: AppUserService;

  @Query(type => Int)
  async appUserCount(
    @Arg('param', () => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<number> {
    return this.appUserService.findCount(param);
  }

  @Query(returns => AppUserList, { nullable: true })
  async appUserList(
    @Arg('param', type => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<AppUserList> {
    return Bb.props({
      list: this.appUserService.findAll(param) as any,
      count: this.appUserService.findCount(param),
    });
  }

  @Query(returns => AppUser, { nullable: true })
  async appUser(@Arg('id', type => ID) id: string): Promise<AppUser> {
    return this.appUserService.findByPk(id);
  }
  @Query(returns => [AppUser])
  async appUserAll(
    @Arg('param', type => QueryListParam, { nullable: true })
    param: QueryListParam
  ): Promise<Array<AppUser>> {
    return this.appUserService.findAll(param) as any;
  }

  @Mutation(returns => AppUser, {
    name: 'appUser',
  })
  async appUserSave(@Arg('param', type => AppUserSaveIn) param: AppUserEntity) {
    return this.appUserService.save(param);
  }

  @Mutation(returns => [AppUser], { nullable: true })
  async appUserBulk(
    @Arg('param', type => [AppUserSaveIn]) param: [AppUserEntity]
  ) {
    return this.appUserService.bulkSave(param);
  }

  @Mutation(returns => String, { nullable: true })
  async appUserDestroy(@Arg('id', type => ID) id: string) {
    return this.appUserService.destroyById(id);
  }
}
