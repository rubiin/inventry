import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { SalesModule } from './sales/sales.module';
import { BillsModule } from './bills/bills.module';
import { FirmModule } from './firm/firm.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forRoot(),
    ExpenseModule,
    SalesModule,
    BillsModule,
    FirmModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
