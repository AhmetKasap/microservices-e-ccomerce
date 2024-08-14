import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async onModuleInit() {
        this.connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
        this.channel = await this.connection.createChannel();
    }

    async consumeBasketQueue(userId: string): Promise<any> {
        await this.channel.assertQueue('basketQueue')
        
        return new Promise((resolve, reject) => {
            this.channel.consume('basketQueue', (response) => {
                const data = JSON.parse(response.content.toString());
    
                if (data.userId === userId) {
                    this.channel.ack(response)
                    resolve(data)
                } else {
                    this.channel.nack(response, false, true)
                }
            }, { noAck: false })
        });
    }
    

    async addBasketToQueue(basket: any, userId: string): Promise<boolean> {
        await this.channel.assertQueue('basketQueue');
        return this.channel.sendToQueue('basketQueue', Buffer.from(JSON.stringify({ basket, userId })));
    }
}
