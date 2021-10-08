import {
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { StaticSnowFlake } from '../utils/flake-id';
import { BaseTable } from '@midwayjs/sequelize';

@BaseTable
export class EntityBase extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: false,
    defaultValue: () => StaticSnowFlake.next(),
  })
  id: string;
  /**
   * 业务编码权限用
   */
  @Column({
    comment: '业务编码权限用',
  })
  businessCode?: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;

  @Column
  createdId: string;

  @Column
  updatedId: string;

  @Column
  deletedId: string;
}
