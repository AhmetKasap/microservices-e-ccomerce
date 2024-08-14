import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './model/PaymentEntity';
import { RabbitMQService } from './rabbitmq.service';
import { PaymentService } from './payment.service';


@Module({
  imports : [
    TypeOrmModule.forFeature([PaymentEntity])
  ],
  controllers: [PaymentController],
  providers: [RabbitMQService, PaymentService, PaymentRepository]
})
export class PaymentModule {}
