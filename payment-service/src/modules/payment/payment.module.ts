import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './model/PaymentEntity';

@Module({
  imports : [
    TypeOrmModule.forFeature([PaymentEntity])
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository]
})
export class PaymentModule {}
