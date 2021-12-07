import { Migration } from '@mikro-orm/migrations';

export class Migration20211207062254 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product_detail" drop constraint if exists "product_detail_product_id_check";');
    this.addSql('alter table "product_detail" alter column "product_id" type int4 using ("product_id"::int4);');
    this.addSql('alter table "product_detail" alter column "product_id" set not null;');

    this.addSql('alter table "product_detail" drop constraint "product_detail_product_id_unique";');
  }

}
