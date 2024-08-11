const amqp = require('amqplib')

require('dotenv').config()

const rabbitmqConnection = require('./RabbitMQ.connection')

const consumeUserQueue = async () => {
    const connection = await rabbitmqConnection()
    const chanel = await connection.createChannel()
    await chanel.assertQueue('userInfoQueue')
    
    await chanel.consume('userInfoQueue', (response) => {
        const data = response.content.toString()
        chanel.ack(response)

        const {createUser} = require('../../controllers/user.controller')
        createUser(data)

        return data
        
    })
}





module.exports = {
    consumeUserQueue
}
