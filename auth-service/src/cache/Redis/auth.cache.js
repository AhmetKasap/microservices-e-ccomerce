const redis = require('redis')

const client = redis.createClient()
client.connect() //redis connection


const addCache = async (userId) => {

    await client.sAdd("userIdList", userId, {'EX' : 432000})

}

const getCache = async (userId) => {

    const foundUserId = await client.sIsMember("userIdList", userId)
    
    if(!foundUserId) return null
    else return foundUserId

}

const deleteCache = async (userId) => {

    await client.sRem(userId)

}




module.exports = {
    addCache, getCache, deleteCache
}