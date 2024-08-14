import { Controller, Get } from '@nestjs/common';

@Controller('payment')
export class PaymentController {

    @Get()
    async createPayment() : Promise<any> {
        
    }

}
