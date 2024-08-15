import { Module } from '@nestjs/common';
import { postgreDBConnection } from './core/config/postgresql.connection';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    
    postgreDBConnection,
    
    OrderModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
