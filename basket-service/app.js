require('express-async-errors');
const express = require('express')
const app = express()
require('dotenv').config()




//! Body-parser
const bodyParser = require('body-parser')    
app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json()) 



//! Routes and ErrorHandler
const routes = require('./src/routes/index.routes')
app.use(`/${process.env.NAME}/${process.env.VERSION}`, routes)


app.use((req,res, next) => {
    res.send('not found url')
    next()
})

const errorHandler = require('./src/middlewares/errorHandler')
app.use(errorHandler)


app.listen(process.env.PORT || 5004, () => {
    console.log(`Server is Running on port ${process.env.PORT || 5004}`)
})