import { Repository } from "typeorm";
import { PaymentEntity } from "./model/PaymentEntity";
import { InjectRepository } from "@nestjs/typeorm";

export class PaymentRepository extends Repository<PaymentEntity> {
    constructor(
        @InjectRepository(PaymentEntity)                     
        private paymentRepository: Repository<PaymentEntity>
    ) {
        super(
            paymentRepository.target,
            paymentRepository.manager,
            paymentRepository.queryRunner,
        )
    }
}