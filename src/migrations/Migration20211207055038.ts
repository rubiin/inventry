import { Migration } from '@mikro-orm/migrations';

export class Migration20211207055038 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "sales" drop constraint "sales_product_id_foreign";');
    this.addSql('alter table "sales" drop column "product_id";');

    this.addSql('create table "sales_books1" ("sales_id" int4 not null, "product_id" int4 not null);');
    this.addSql('alter table "sales_books1" add constraint "sales_books1_pkey" primary key ("sales_id", "product_id");');

    this.addSql('alter table "sales_books1" add constraint "sales_books1_sales_id_foreign" foreign key ("sales_id") references "sales" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "sales_books1" add constraint "sales_books1_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');
  }

}
