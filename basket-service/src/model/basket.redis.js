const redis = require('redis')

const client = redis.createClient({url :'redis://127.0.0.1:6380'})
client.connect() //redis connection


const addProductBasket = async (userId, product) => {
    const key = `basket:${userId}`

    const length = await client.lLen(key) 

    const result = await client.lPush(key, JSON.stringify(product)) 
    if(result === length+1) return true
    else false

}

const getBasket = async(userId) => {
    const key = `basket:${userId}`

    const result = await client.lLen(key)
    if(result<1) return false 

    const basket = await client.lRange(key, 0, -1)
    
    const basketItems = basket.map(item => JSON.parse(item))
    return basketItems

}

const deleteProductBasket = async (userId, productId) => {
    const key = `basket:${userId}`

    const basket = await client.lRange(key, 0, -1)
    const basketItems = basket.map(item => JSON.parse(item))

    const productToDelete = basketItems.find(item => item.productId === productId)
    if (!productToDelete) {
        console.log(`Product with productId ${productId} not found in the basket.`)
        return
    }

    const productToDeleteString = JSON.stringify(productToDelete)

    const deletedCount = await client.lRem(key, 0, productToDeleteString)
    return deletedCount

  
}


  
  
  
  module.exports = {
    addProductBasket,
    getBasket,
    deleteProductBasket
  };