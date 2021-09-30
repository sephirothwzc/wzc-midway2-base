import { Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';
import { App_user } from './app-user.entity';

@BaseTable
export class App_order extends Model {
  /**
   * 用户id
   */
  @ForeignKey(() => App_user)
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

  @BelongsTo(() => App_user, 'app_user_id')
  App_user_idObj: App_user;
}
