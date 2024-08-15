import { Repository } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class OrderRepository extends Repository<OrderEntity> {
    constructor(
        @InjectRepository(OrderEntity)                     
        private orderRepository: Repository<OrderEntity>
    ) {
        super(
            orderRepository.target,
            orderRepository.manager,
            orderRepository.queryRunner,
        )
    }

}