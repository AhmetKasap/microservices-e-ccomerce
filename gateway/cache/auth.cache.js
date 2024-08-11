const redis = require('redis')

const client = redis.createClient({url :'redis://127.0.0.1:6379'})
client.connect() //redis connection

const getCache = async (userId) => {

    const foundUserId = await client.sIsMember("userIdList", userId)
    
    if(!foundUserId) return null
    else return foundUserId
}


module.exports = {
    getCache
}