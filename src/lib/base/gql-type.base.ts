import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class GqlObjectTypeBase {
  @Field(() => ID)
  id!: number;

  /**
   * 业务编码权限用
   */
  @Field(() => String, {
    description: '业务编码权限用',
  })
  businessCode?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;

  @Field(() => String)
  createdId: string;

  @Field(() => String)
  updatedId: string;

  @Field(() => String)
  deletedId: string;
}

@InputType()
export class GqlInputTypeBase {
  @Field(() => ID)
  id!: number;

  /**
   * 业务编码权限用
   */
  @Field(() => String, {
    description: '业务编码权限用',
  })
  businessCode?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  deletedAt: Date;

  @Field(() => String)
  createdId: string;

  @Field(() => String)
  updatedId: string;

  @Field(() => String)
  deletedId: string;
}
