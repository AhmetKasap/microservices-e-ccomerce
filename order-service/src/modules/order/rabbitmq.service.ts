import { Injectable, OnModuleInit } from '@nestjs/common'
import * as amqp from 'amqplib'
import { Subject } from 'rxjs'

@Injectable()
export class RabbitMQService implements OnModuleInit {

    private connection: amqp.Connection
    private channel: amqp.Channel
    private messageSubject = new Subject<any>()

    async onModuleInit() {
        await this.connect()
        this.consumeOrderQueue()
    }

    async connect() {
        if (!this.connection || !this.channel) {
            this.connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING)
            this.channel = await this.connection.createChannel()
        }
    }

    async consumeOrderQueue(): Promise<void> {
        await this.connect();
        await this.channel.assertQueue('orderQueue')

        this.channel.consume('orderQueue', (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString())
                this.channel.ack(msg)
                this.messageSubject.next(data)
            }
        }, { noAck: false })
    }

    getMessages() {
        return this.messageSubject.asObservable()
    }
}
