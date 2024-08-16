require('express-async-errors')
const express = require('express')
const app = express()
const checkToken = require('./token/checkToken')
const cors = require('cors')
const helmet = require("helmet")
const morgan = require("morgan")



//! SECURITY
app.use(helmet()) 
app.use(morgan("combined"))
app.disable("x-powered-by")

const limit = require('./security/rateLimit')
app.use('/api-gateway/v1/*', limit)

const corsOptions = require('./security/cors')
//app.use(cors(corsOptions))


//!SERVICES
const gatewayPath="/api-gateway/v1"

const authProxy = require('./services/auth')
const userProxy = require('./services/user')
const productProxy = require('./services/product')
const basketProxy = require('./services/basket')
const paymentProxy = require('./services/payment')
const orderProxy = require('./services/order')

app.use(`${gatewayPath}/auth/*`, authProxy)
app.use(`${gatewayPath}/users/*`, checkToken, userProxy)
app.use(`${gatewayPath}/products*`, checkToken, productProxy)
app.use(`${basketProxy}/baskets*`, checkToken, basketProxy)
app.use(`${basketProxy}/payments*`, checkToken, paymentProxy)
app.use(`${basketProxy}/orders*`, checkToken, orderProxy)



//! Errorhandler
const errorHandler = require('./Exceptions/errorHandler')
app.use(errorHandler)


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Running on port ${process.env.PORT || 5000}`)
})

