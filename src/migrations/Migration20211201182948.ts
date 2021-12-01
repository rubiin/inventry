import { Migration } from '@mikro-orm/migrations';

export class Migration20211201182948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `sales` modify `product_id` int(11) unsigned;');
    this.addSql('alter table `sales` drop index `sales_product_id_index`;');
    this.addSql('alter table `sales` add index `sales_product_id_index`(`product_id`);');

    this.addSql('create table `bill` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `image` varchar(250) not null, `firm_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `bill` add index `bill_firm_id_index`(`firm_id`);');

    this.addSql('alter table `bill` add constraint `bill_firm_id_foreign` foreign key (`firm_id`) references `firm` (`id`) on update cascade;');
  }

}
