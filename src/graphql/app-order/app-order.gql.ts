import { Field, ObjectType, InputType, Int } from 'type-graphql';
import { IsString, Length } from 'class-validator';
import {
  GqlInputTypeBase,
  GqlObjectTypeBase,
} from '../../lib/base/gql-type.base';
import { AppOrderEntity } from '../../lib/model/app-order.entity';

@ObjectType()
export class AppOrder extends GqlObjectTypeBase {
  @Field(() => Boolean)
  name!: boolean;

  @IsString()
  @Field(() => AppOrder)
  appOrder: AppOrderEntity;
}

@ObjectType()
export class AppOrderList {
  @Field(() => [AppOrder])
  list: Array<AppOrderEntity>;

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
