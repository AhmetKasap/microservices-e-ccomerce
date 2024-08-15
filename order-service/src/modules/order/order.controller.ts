import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { APIResponse } from 'src/common/Utils/ApiResponse';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrder() : Promise<any> {


  }

  @Get("/users")
  async getOrderByUserId(@Res() res: Response) : Promise<any>{
     //const userId = req.headers['user-id']
     const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e"

     const response = await this.orderService.getOrderByUserId(userId)
     if(response) return new APIResponse('okey', response).ok(res)


  }

 

}
