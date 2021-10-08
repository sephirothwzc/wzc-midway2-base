import { Field, ObjectType, InputType, Int } from 'type-graphql';
import { AppUserEntity } from '../../lib/model/app-user.entity';
import { AppUser } from '../app-user/app-user.gql';
import { AppUserSaveIn } from '../app-user/app-user.gql';
import { IsString, MaxLength, IsInt } from 'class-validator';
import {
  GqlInputTypeBase,
  GqlObjectTypeBase,
} from '../../lib/base/gql-type.base';

@ObjectType()
export class AppOrder extends GqlObjectTypeBase {
  /**
   * 用户id
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '用户id',
    nullable: true,
  })
  appUserId?: string;
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
   * 消息队列id
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '消息队列id',
    nullable: true,
  })
  msgId?: string;
  /**
   * 订单金额分
   */
  @IsInt()
  @Field(() => Int, {
    description: '订单金额分',
    nullable: true,
  })
  orderAmount?: number;
  /**
   * 三方支付订单id
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '三方支付订单id',
    nullable: true,
  })
  otherId?: string;
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
   * 订单状态
   */
  @IsString()
  @MaxLength(20)
  @Field(() => String, {
    description: '订单状态',
    nullable: true,
  })
  status?: string;
  /**
   * BaseTable.version
   */
  @IsInt()
  @Field(() => Int, {
    description: 'BaseTable.version',
    nullable: true,
  })
  version?: number;

  @Field(() => AppUser, { nullable: true })
  AppUserIdObj: AppUserEntity;
}

@ObjectType()
export class AppOrderList {
  @Field(() => [AppOrder], { nullable: true })
  list: Array<AppOrder>;

  @Field(() => Int, { nullable: true })
  count: number;
}

@InputType()
export class AppOrderSaveIn extends GqlInputTypeBase {
  /**
   * 用户id
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '用户id',
    nullable: true,
  })
  appUserId?: string;
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
   * 消息队列id
   */
  @IsString()
  @MaxLength(200)
  @Field(() => String, {
    description: '消息队列id',
    nullable: true,
  })
  msgId?: string;
  /**
   * 订单金额分
   */
  @IsInt()
  @Field(() => Int, {
    description: '订单金额分',
    nullable: true,
  })
  orderAmount?: number;
  /**
   * 三方支付订单id
   */
  @IsString()
  @MaxLength(50)
  @Field(() => String, {
    description: '三方支付订单id',
    nullable: true,
  })
  otherId?: string;
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
   * 订单状态
   */
  @IsString()
  @MaxLength(20)
  @Field(() => String, {
    description: '订单状态',
    nullable: true,
  })
  status?: string;
  /**
   * BaseTable.version
   */
  @IsInt()
  @Field(() => Int, {
    description: 'BaseTable.version',
    nullable: true,
  })
  version?: number;

  @Field(() => AppUserSaveIn, { nullable: true })
  AppUserIdObj: AppUserEntity;
}
