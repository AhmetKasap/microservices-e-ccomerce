const amqp = require('amqplib')

require('dotenv').config()

const rabbitmqConnection = require('./RabbitMQ.connection')

const addBasketToQueue = async (user) => {
    const connection = await rabbitmqConnection()
    const chanel = await connection.createChannel()
    await chanel.assertQueue('basketQueue')
    
    const success = chanel.sendToQueue('basketQueue', Buffer.from(JSON.stringify(user)))
    if(success === true) return true
}

module.exports = {
    addBasketToQueue
}
