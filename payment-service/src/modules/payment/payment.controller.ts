import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly paymentService : PaymentService
    ) {}

    @Get()
    async createPayment() : Promise<any> {
        //const userId = req.headers['user-id']
        const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e";
        
        const basket = await this.rabbitMQService.consumeBasketQueue(userId)
        if(basket){
             
        }

       
    }
}
