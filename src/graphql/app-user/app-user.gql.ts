import { Field, ObjectType, InputType, Int } from 'type-graphql';
import { IsString, Length } from 'class-validator';
import {
  GqlInputTypeBase,
  GqlObjectTypeBase,
} from '../../lib/base/gql-type.base';
import { AppOrderEntity } from '../../lib/model/app-order.entity';
import { AppUser } from '../../lib/model/app-user.entity';
import { AppOrder } from '../app-order/app-order.gql';

@ObjectType()
export default class GqlAppUser extends GqlObjectTypeBase {
  @Field(() => Boolean)
  name!: boolean;

  @Field(() => AppOrder)
  appOrder: AppOrderEntity;
}

@ObjectType()
export class GqlAppUserList {
  @Field(() => [GqlAppUser], { nullable: true })
  list: Array<AppUser>;

  @Field(() => Int, { nullable: true })
  count: number;
}

@InputType()
export class AppUserSaveIn extends GqlInputTypeBase {
  @Field()
  @IsString()
  @Length(2, 10)
  name!: string;
}
