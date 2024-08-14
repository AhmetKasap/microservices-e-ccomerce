import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PaymentDTO } from './dto/PaymentDTO';
import { RabbitMQService } from './rabbitmq.service';
import { UUID } from 'crypto';

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository : PaymentRepository,
        private readonly rabbitMQService: RabbitMQService
    ) {}


    async createPayment (paymentDTO : PaymentDTO,  userId : UUID) : Promise<any> {
        console.log(userId)
        const getBasket = await this.rabbitMQService.consumeBasketQueue(userId)
        console.log(getBasket)

        if(getBasket){
            const card = await this.paymentRepository.create({
                ...paymentDTO,
                userId : userId
            })

            const cardSaved = await this.paymentRepository.save(card)
            if(cardSaved) {
                const addOrderQueue = await this.rabbitMQService.addOrderQueue(getBasket)
                console.log("addOrderQueue", addOrderQueue)
                if(addOrderQueue === true) return true
                else return false
                
            }
            else console.log("card yok")

        }
        else console.log("basket yok")
    }


}
