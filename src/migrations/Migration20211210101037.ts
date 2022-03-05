import { Migration } from '@mikro-orm/migrations';

export class Migration20211210101037 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "bill" add column "discount" int4 not null;');
  }
}
