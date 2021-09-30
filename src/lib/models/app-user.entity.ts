import { Column, Model, HasMany } from 'sequelize-typescript';
import { BaseTable } from '@midwayjs/sequelize';
import { App_order } from './app-order.entity';

@BaseTable
export class App_user extends Model {
  /**
   * 生日
   */
  @Column({
    comment: '生日',
  })
  birthday?: Date;
  /**
   * 业务编码权限用
   */
  @Column({
    comment: '业务编码权限用',
  })
  businessCode?: string;
  /**
   * 性别
   */
  @Column({
    comment: '性别',
  })
  gender?: Date;
  /**
   * 头像
   */
  @Column({
    comment: '头像',
  })
  hdaderImg?: string;
  /**
   * 昵称唯一[unique]
   */
  @Column({
    comment: '昵称唯一[unique]',
  })
  nickname?: string;
  /**
   * 微信openid
   */
  @Column({
    comment: '微信openid',
  })
  openid?: string;
  /**
   * 密码
   */
  @Column({
    comment: '密码',
  })
  password?: string;
  /**
   * 手机号唯一[unique]
   */
  @Column({
    comment: '手机号唯一[unique]',
  })
  phone?: string;
  /**
   * 真实姓名
   */
  @Column({
    comment: '真实姓名',
  })
  realName?: string;
  /**
   * 备注
   */
  @Column({
    comment: '备注',
  })
  remark?: string;
  /**
   * 状态normal正常black拉黑
   */
  @Column({
    comment: '状态normal正常black拉黑',
  })
  status?: string;
  /**
   * 微信unionid
   */
  @Column({
    comment: '微信unionid',
  })
  unionid?: string;

  @HasMany(() => App_order, 'app_user_id')
  appOrderApp_user_id: Array<App_order>;
}
