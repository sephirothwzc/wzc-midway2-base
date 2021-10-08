import {
  Field,
  ObjectType,
  InputType,
  Int,
  GraphQLISODateTime,
} from 'type-graphql';
import { AppOrderEntity } from '../../lib/model/app-order.entity';
import { AppOrder } from '../app-order/app-order.gql';
import { AppOrderSaveIn } from '../app-order/app-order.gql';
import { IsDate, IsString, MaxLength } from 'class-validator';
import {
  GqlInputTypeBase,
  GqlObjectTypeBase,
} from '../../lib/base/gql-type.base';

@ObjectType()
export class AppUser extends GqlObjectTypeBase {
  /**
   * 生日
   */
  @IsDate()
  @Field(() => GraphQLISODateTime, {
    description: '生日',
    nullable: true,
  })
  birthday?: Date;
  /**
   * 业务编码权限用
   */
  @IsString()
  @MaxLength(500)
  @Field(() => String, {
    description: '业务编码权限用',
    nullable: true,
  })
  businessCode?: string;
  /**
   * 性别
   */
  @IsDate()
  @Field(() => GraphQLISODateTime, {
    description: '性别',
    nullable: true,
  })
  gender?: Date;
  /**
   * 头像
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '头像',
    nullable: true,
  })
  hdaderImg?: string;
  /**
   * 昵称唯一[unique]
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '昵称唯一[unique]',
    nullable: true,
  })
  nickname?: string;
  /**
   * 微信openid
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '微信openid',
    nullable: true,
  })
  openid?: string;
  /**
   * 密码
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '密码',
    nullable: true,
  })
  password?: string;
  /**
   * 手机号唯一[unique]
   */
  @IsString()
  @MaxLength(20)
  @Field(() => String, {
    description: '手机号唯一[unique]',
    nullable: true,
  })
  phone?: string;
  /**
   * 真实姓名
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '真实姓名',
    nullable: true,
  })
  realName?: string;
  /**
   * 备注
   */
  @IsString()
  @MaxLength(500)
  @Field(() => String, {
    description: '备注',
    nullable: true,
  })
  remark?: string;
  /**
   * 状态normal正常black拉黑
   */
  @IsString()
  @MaxLength(10)
  @Field(() => String, {
    description: '状态normal正常black拉黑',
    nullable: true,
  })
  status?: string;
  /**
   * 微信unionid
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '微信unionid',
    nullable: true,
  })
  unionid?: string;

  @Field(() => [AppOrder], { nullable: true })
  appOrderAppUserId: Array<AppOrderEntity>;
}

@ObjectType()
export class AppUserList {
  @Field(() => [AppUser], { nullable: true })
  list: Array<AppUser>;

  @Field(() => Int, { nullable: true })
  count: number;
}

@InputType()
export class AppUserSaveIn extends GqlInputTypeBase {
  /**
   * 生日
   */
  @IsDate()
  @Field(() => GraphQLISODateTime, {
    description: '生日',
    nullable: true,
  })
  birthday?: Date;
  /**
   * 业务编码权限用
   */
  @IsString()
  @MaxLength(500)
  @Field(() => String, {
    description: '业务编码权限用',
    nullable: true,
  })
  businessCode?: string;
  /**
   * 性别
   */
  @IsDate()
  @Field(() => GraphQLISODateTime, {
    description: '性别',
    nullable: true,
  })
  gender?: Date;
  /**
   * 头像
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '头像',
    nullable: true,
  })
  hdaderImg?: string;
  /**
   * 昵称唯一[unique]
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '昵称唯一[unique]',
    nullable: true,
  })
  nickname?: string;
  /**
   * 微信openid
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '微信openid',
    nullable: true,
  })
  openid?: string;
  /**
   * 密码
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '密码',
    nullable: true,
  })
  password?: string;
  /**
   * 手机号唯一[unique]
   */
  @IsString()
  @MaxLength(20)
  @Field(() => String, {
    description: '手机号唯一[unique]',
    nullable: true,
  })
  phone?: string;
  /**
   * 真实姓名
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '真实姓名',
    nullable: true,
  })
  realName?: string;
  /**
   * 备注
   */
  @IsString()
  @MaxLength(500)
  @Field(() => String, {
    description: '备注',
    nullable: true,
  })
  remark?: string;
  /**
   * 状态normal正常black拉黑
   */
  @IsString()
  @MaxLength(10)
  @Field(() => String, {
    description: '状态normal正常black拉黑',
    nullable: true,
  })
  status?: string;
  /**
   * 微信unionid
   */
  @IsString()
  @MaxLength(100)
  @Field(() => String, {
    description: '微信unionid',
    nullable: true,
  })
  unionid?: string;

  @Field(() => [AppOrderSaveIn], { nullable: true })
  appOrderAppUserId: Array<AppOrderEntity>;
}
