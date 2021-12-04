import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { SalesModule } from './modules/sales/sales.module';
import { BillsModule } from './modules/bills/bills.module';
import { FirmModule } from './modules/firm/firm.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      exclude: ['/api*'],
    }),
    ExpenseModule,
    SalesModule,
    BillsModule,
    FirmModule,
    ProductsModule,
    AuthModule,
    ProductDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
