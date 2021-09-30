import { Provide, Inject } from '@midwayjs/decorator';
import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';

import AppUser, {
  AppUserSaveIn,
  AppUserList,
} from '../graphql/app-user/app-user.gql';
import QueryListParam from '../graphql/utils/query-list-param.gql';

/**
 *
 *   # 用户 总行数
  appUserCount(param: QueryListParam): Int
  # 用户 分页查询
  appUserList(param: QueryListParam): AppUserList
  # 用户  id 获取
  appUser(id: ID!): AppUser
  # 用户 有条件返回
  appUserAll(param: QueryListParam): [AppUser]
 *
 */

@Provide()
@Resolver(() => AppUser)
export default class AppUserResolver {
  @Query(() => Int)
  appUserCount(
    @Arg('param', () => QueryListParam, { nullable: true })
    param: QueryListParam
  ): number {
    return this.mockUser.slice(offset, offset + take);
  }

  @Query(returns => User, { nullable: true })
  GetUserById(@Arg('id', type => Int) id: number): User {
    return this.mockUser.find(value => value.id === id);
  }

  @Mutation(returns => User, { nullable: true })
  CreateUser(
    @Arg('createParams', type => UserCreateInput) createParams: UserCreateInput
  ) {
    const len = this.mockUser.length;
    const id = this.mockUser[len - 1].id + 1;
    const createdUser = {
      id,
      name: createParams.name,
    };
    this.mockUser.push(createdUser);

    return createdUser;
  }

  @Mutation(returns => User, { nullable: true })
  UpdateUser(
    @Arg('updateParams', type => UserUpdateInput) updateParams: UserUpdateInput
  ): User {
    const updateItem = this.mockUser.find(val => val.id === updateParams.id);
    updateItem.name = updateParams.name;

    return updateItem;
  }

  @Mutation(returns => User, { nullable: true })
  DeleteUser(@Arg('id', type => Int) id: number): User {
    const deleteItem = this.mockUser.find(val => val.id === id);
    const deleteIdx = this.mockUser.indexOf(deleteItem);

    this.mockUser.splice(deleteIdx, 1);
    return deleteItem;
  }
}
