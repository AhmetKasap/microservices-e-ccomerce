const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const {addProductBasket, getBasket, deleteProductBasket} = require('../model/basket.redis')
const {getProduct} = require('../getProducts/get.products')


const addProductToBasket = async(req,res) => {
    //const userId = await req.headers['user-id']
    const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e"

    if(!userId) throw new APIError('user not found', 404)
    
    //get product with http request
    const product = await getProduct(req.body.productId)
   
    if(product) {
        const result = await addProductBasket(userId, product)
        if(result === true) return new Response(null, 'product added to cart').ok(res)
        else throw new APIError('an error occurred while adding the product to the basket',500)
    }
}

const getBasketByUserId = async(req,res) => {
    //const userId = await req.headers['user-id']
    const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e"

    if(!userId) throw new APIError('user not found', 404)

    const basket = await getBasket(userId)
    if(basket === false) return new Response(null, 'your basket is empty, you can add products')
    
    const totalPrice = calculateTotalPrice(basket)
    const resultBasket = {
        basket,
        totalPrice
    }
   
    return new Response(resultBasket, "products in basket").ok(res)

}

const deleteProductToBasket = async(req,res) => {
    //const userId = await req.headers['user-id']
    const userId = "b2a2d65b-0d28-4c88-9c77-8a4a731cfd1e"
    const productId = req.params.id

    if(!userId) throw new APIError('user not found', 404)
    
    const result = await deleteProductBasket(userId, productId)
    if(result) return new Response(null, 'product successfully deleted' ).ok(res)

}

const confirimBasket = async(req,res) => {

}


const calculateTotalPrice = (basket) => {
    const totalPrice = basket.reduce((sum, item) => {
            return sum + (item.productPrice || 0);
    }, 0);
    
    return totalPrice;
};





module.exports = {
    addProductToBasket, getBasketByUserId,deleteProductToBasket
}