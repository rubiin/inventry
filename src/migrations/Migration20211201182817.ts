import { Migration } from '@mikro-orm/migrations';

export class Migration20211201182817 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `first_name` varchar(50) not null, `middle_name` varchar(50) null, `last_name` varchar(50) not null, `email` varchar(60) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `product` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `name` varchar(50) not null, `description` varchar(250) not null, `quantity` int(11) not null, `price` int(11) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `sales` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `quantity` int(11) not null, `price` int(11) not null, `discount` int(11) null, `product_id` int(11) unsigned not null, `vat` int(11) null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `sales` add index `sales_product_id_index`(`product_id`);');

    this.addSql('create table `firm` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `phone` varchar(50) not null, `address` varchar(50) not null, `email` varchar(60) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `firm` add unique `firm_email_unique`(`email`);');

    this.addSql('create table `expenses` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `cost` int(11) not null, `type` varchar(250) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `bill` (`id` int unsigned not null auto_increment primary key, `created_at` json not null, `updated_at` json not null, `firm_id` int(11) not null, `image` varchar(250) not null, `firm_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `bill` add index `bill_firm_id_index`(`firm_id`);');

    this.addSql('alter table `sales` add constraint `sales_product_id_foreign` foreign key (`product_id`) references `product` (`id`) on update cascade;');

    this.addSql('alter table `bill` add constraint `bill_firm_id_foreign` foreign key (`firm_id`) references `firm` (`id`) on update cascade;');
  }

}
