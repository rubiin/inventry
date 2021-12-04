import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Bill } from './bills';

@Entity()
export class Firm extends BaseEntity {
  @Property({
    length: 50,
  })
  phone: string;

  @Property({
    length: 50,
  })
  address: string;

  @Property({
    length: 100,
  })
  supplierName: string;

  @Property({
    length: 100,
  })
  productName: string;

  @Property({
    length: 60,
    unique: true,
  })
  email: string;
}
