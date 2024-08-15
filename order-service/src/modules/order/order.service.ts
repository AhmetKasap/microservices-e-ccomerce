import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { OrderRepository } from './order.repository';
import { UUID } from 'crypto';

@Injectable()
export class OrderService implements OnModuleInit {

  constructor(
    private readonly rabbitmqService: RabbitMQService,
    private readonly orderRepository : OrderRepository

  ) {}

  async onModuleInit() {
    this.rabbitmqService.getMessages().subscribe((message) => {
      this.handleIncomingMessage(message);
    });
  }


  //! CREATE ORDER
  private async handleIncomingMessage(message: any) {
    const order = message.basket
    console.log(order.basket)

    const created = await this.orderRepository.create({
      userId : order.userId,
      orderProducts : order.basket

    })
    const saved = await this.orderRepository.save(created)

  }


  async getOrderByUserId (userId : UUID) : Promise<any> {
      const orders = await this.orderRepository.find({
        where : {userId : userId}
      })
      const newObject = orders.map(order => {
        return {
            orderProducts: order.orderProducts,
            id: order.id
        }
      })

      return newObject
        
     
  }









}
