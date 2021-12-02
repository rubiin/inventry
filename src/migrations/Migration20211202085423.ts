import { Migration } from '@mikro-orm/migrations';

export class Migration20211202085423 extends Migration {
  async up(): Promise<void> {
    this.addSql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "first_name" varchar(50) not null, "middle_name" varchar(50) null, "last_name" varchar(50) not null, "email" varchar(60) not null, "password" varchar(255) not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "product" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "name" varchar(50) not null, "description" varchar(250) not null, "quantity" int4 not null, "price" int4 not null);',
    );

    this.addSql(
      'create table "sales" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "quantity" int4 not null, "price" int4 not null, "discount" int4 null, "product_id" int4 not null, "vat" int4 null);',
    );

    this.addSql(
      'create table "firm" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "phone" varchar(50) not null, "address" varchar(50) not null, "email" varchar(60) not null);',
    );
    this.addSql(
      'alter table "firm" add constraint "firm_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "expenses" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "cost" int4 not null, "type" varchar(250) not null);',
    );

    this.addSql(
      'create table "bill" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "image" varchar(250) not null, "firm_id" int4 not null);',
    );

    this.addSql(
      'alter table "sales" add constraint "sales_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "bill" add constraint "bill_firm_id_foreign" foreign key ("firm_id") references "firm" ("id") on update cascade;',
    );
  }
}
