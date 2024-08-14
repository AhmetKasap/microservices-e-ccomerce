import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async connect() {
        if (!this.connection || !this.channel) {
            this.connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
            this.channel = await this.connection.createChannel();
        }
    }

    async consumeBasketQueue(userId: string): Promise<any> {
        await this.connect()
        await this.channel.assertQueue('basketQueue')

        return new Promise((resolve, reject) => {
            this.channel.consume('basketQueue', (response) => {
                const data = JSON.parse(response.content.toString());
                if (data.userId === userId) {
                    this.channel.ack(response);
                    resolve(data); // Veriyi geri döndür
                }
            }, { noAck: false });
        });
        
        
        
    }
    

    async addOrderQueue(basket: any): Promise<boolean> {
        await this.channel.assertQueue('orderQueue');
        return this.channel.sendToQueue('orderQueue', Buffer.from(JSON.stringify({ basket })));
    }
}
