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
import { DamagedProductModule } from './modules/damaged-product/damaged-product.module';
import { FinancialModule } from './modules/financial/financial.module';
import { LoggingInterceptor } from './common/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    DamagedProductModule,
    FinancialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
