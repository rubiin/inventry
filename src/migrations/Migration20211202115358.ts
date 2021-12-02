import { Migration } from '@mikro-orm/migrations';

export class Migration20211202115358 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product" add column "image" varchar(250) not null;',
    );
  }
}
