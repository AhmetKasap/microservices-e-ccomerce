const express = require('express')
const router = express.Router()


const basketRoutes = require('./basket.routes')
router.use('/baskets', basketRoutes)



module.exports = router