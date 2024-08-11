const amqp = require('amqplib')
const APIError = require('../../utils/Error')
require('dotenv').config()

const rabbitmqConnection = require('./RabbitMQ.connection')

const addUserToQueue = async (user) => {
    const chanel = await rabbitmqConnection().createChannel()
    await chanel.assertQueeu('userInfoQueue')
    
    await chanel.sendToQueue('userInfoQueue', Buffer.from(JSON.stringify(user)))
}

module.exports = {
    addUserToQueue
}
