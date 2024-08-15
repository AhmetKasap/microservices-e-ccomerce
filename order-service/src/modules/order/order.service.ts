import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { OrderRepository } from './order.repository';

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

    const created = await this.orderRepository.create({
      userId : order.userId,
      orderProducts : order.basket

    })
    const saved = await this.orderRepository.save(created)

  }



  





}
