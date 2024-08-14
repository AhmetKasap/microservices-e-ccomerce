const express = require('express')
const router = express.Router()

 
const {
    addProductToBasket,getBasketByUserId,deleteProductToBasket,confirimBasket
    

} = require('../controllers/basket.controller')


router.post('/', addProductToBasket)
router.get('/', getBasketByUserId)
router.delete('/:id', deleteProductToBasket)
router.get('/confirim', confirimBasket)

module.exports = router