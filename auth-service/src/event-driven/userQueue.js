const amqp = require('amqplib')

require('dotenv').config()

const rabbitmqConnection = require('./RabbitMQ.connection')

const addUserToQueue = async (user) => {
    const connection = await rabbitmqConnection()
    const chanel = await connection.createChannel()
    await chanel.assertQueue('userInfoQueue')
    
    const success = chanel.sendToQueue('userInfoQueue', Buffer.from(JSON.stringify(user)))
    if(success === true) console.log("user sent to queue")
}

module.exports = {
    addUserToQueue
}
