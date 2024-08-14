const express = require('express')
const router = express.Router()

 
const {
    addProductToBasket,getBasketByUserId,deleteProductToBasket
    

} = require('../controllers/basket.controller')


router.post('/', addProductToBasket)
router.get('/', getBasketByUserId)
router.delete('/:id', deleteProductToBasket)

module.exports = router