import { Migration } from '@mikro-orm/migrations';

export class Migration20211208101820 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "first_name" varchar(50) not null, "middle_name" varchar(50) null, "last_name" varchar(50) not null, "email" varchar(60) not null, "password" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "sales" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "client_name" varchar(255) not null, "client_address" varchar(255) not null, "total" int4 not null, "cash_received" int4 not null, "cash_returned" int4 not null);');

    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "name" varchar(50) not null, "image" varchar(250) not null, "quantity" int4 not null, "price" int4 not null);');

    this.addSql('create table "product_detail" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "name" varchar(50) not null, "price" int4 not null, "product_id" int4 not null);');

    this.addSql('create table "firm" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "phone" varchar(50) not null, "address" varchar(50) not null, "supplier_name" varchar(100) not null, "product_name" varchar(100) not null, "email" varchar(60) not null);');
    this.addSql('alter table "firm" add constraint "firm_email_unique" unique ("email");');

    this.addSql('create table "expenses" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "cost" int4 not null, "type" varchar(250) not null);');

    this.addSql('create table "damage_product" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "name" varchar(50) not null, "quantity" int4 not null, "product_id" int4 not null);');

    this.addSql('create table "bill" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null default CURRENT_TIMESTAMP, "quantity" int4 not null, "rate_per" varchar(255) not null, "vat" int4 not null, "amount" int4 not null, "product_detail_id" int4 not null, "sale_id" int4 not null);');

    this.addSql('alter table "product_detail" add constraint "product_detail_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "damage_product" add constraint "damage_product_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "bill" add constraint "bill_product_detail_id_foreign" foreign key ("product_detail_id") references "product_detail" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "bill" add constraint "bill_sale_id_foreign" foreign key ("sale_id") references "sales" ("id") on update cascade on delete cascade;');
  }

}
