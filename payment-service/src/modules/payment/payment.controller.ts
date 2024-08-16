import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { PaymentService } from './payment.service';
import { PaymentDTO } from './dto/PaymentDTO';
import { APIResponse } from 'src/common/Utils/ApiResponse';
import { Response } from 'express';

@Controller('payments')
export class PaymentController {
    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly paymentService : PaymentService
    ) {}

    @Post()
    async createPayment(@Req() req: Request, @Body() paymentDTO : PaymentDTO, @Res() res:Response) : Promise<any> {
        const userId = req.headers['user-id']
        //const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e";
        
        const test = await this.paymentService.createPayment(paymentDTO, userId)
        if(test === true) return new APIResponse(null, "payment successfull").ok(res)
        
        

       
    }
}
