const express = require('express')
const router = express.Router()


const basketRoutes = require('./basket.routes')
router.use('/basket', basketRoutes)



module.exports = router