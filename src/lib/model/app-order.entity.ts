import { Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { EntityBase } from '../base/entity.base';
import { BaseTable } from '@midwayjs/sequelize';
import { AppUserEntity } from './app-user.entity';

@BaseTable({ tableName: 'app_order' })
export class AppOrderEntity extends EntityBase {
  /**
   * 用户id
   */
  @ForeignKey(() => AppUserEntity)
  @Column({
    comment: '用户id',
  })
  appUserId?: string;
  /**
   * 业务编码权限用
   */
  @Column({
    comment: '业务编码权限用',
  })
  businessCode?: string;
  /**
   * 消息队列id
   */
  @Column({
    comment: '消息队列id',
  })
  msgId?: string;
  /**
   * 订单金额分
   */
  @Column({
    comment: '订单金额分',
  })
  orderAmount?: number;
  /**
   * 三方支付订单id
   */
  @Column({
    comment: '三方支付订单id',
  })
  otherId?: string;
  /**
   * 备注
   */
  @Column({
    comment: '备注',
  })
  remark?: string;
  /**
   * 订单状态
   */
  @Column({
    comment: '订单状态',
  })
  status?: string;
  /**
   * BaseTable.version
   */
  @Column({
    comment: 'BaseTable.version',
  })
  version?: number;

  @BelongsTo(() => AppUserEntity, 'app_user_id')
  AppUserIdObj: AppUserEntity;
}
