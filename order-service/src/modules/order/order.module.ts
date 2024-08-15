import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { RabbitMQService } from './rabbitmq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([OrderEntity])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, RabbitMQService],
})
export class OrderModule {}
