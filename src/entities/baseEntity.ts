import { PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Exclude({ toPlainOnly: true })
  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    nullable: true,
    onUpdate: () => new Date(),
  })
  updatedAt?: Date = new Date();
}
