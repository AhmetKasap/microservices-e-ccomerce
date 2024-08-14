import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { postgreDBConnection } from './core/config/postgresql.connection';

@Module({
  imports: [
    PaymentModule,
    postgreDBConnection
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
