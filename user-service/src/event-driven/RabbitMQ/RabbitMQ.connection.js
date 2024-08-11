const amqp = require('amqplib')
const APIError = require('../../utils/Error')
require('dotenv').config()

const rabbitmqConnection = async () => {
    try {
        return await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING)  //* amqp connection
        
    } catch (error) {
        throw new APIError('rabbitmq connection error', 500)
    }

}

module.exports = rabbitmqConnection