import { Migration } from '@mikro-orm/migrations';

export class Migration20211202015530 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `is_active` tinyint(1) not null;');

    this.addSql('alter table `product` add `is_active` tinyint(1) not null;');

    this.addSql('alter table `sales` add `is_active` tinyint(1) not null;');
    this.addSql('alter table `sales` modify `product_id` int(11) unsigned not null;');
    this.addSql('alter table `sales` drop index `sales_product_id_index`;');
    this.addSql('alter table `sales` add index `sales_product_id_index`(`product_id`);');

    this.addSql('alter table `firm` add `is_active` tinyint(1) not null;');

    this.addSql('alter table `expenses` add `is_active` tinyint(1) not null;');

    this.addSql('alter table `bill` add `is_active` tinyint(1) not null;');
  }

}
