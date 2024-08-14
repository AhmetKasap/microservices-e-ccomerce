import { Module } from '@nestjs/common';
import { postgreDBConnection } from './core/config/postgresql.connection';

@Module({
  imports: [
    
    postgreDBConnection
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
