const express = require('express')
const router = express.Router();

//routes
const userRoutes = require('./users/userRoute')
const authRoute = require('./users/authRoute')

module.exports = function(app){
    
    app.use('', authRoute)
    app.use('', userRoutes)
    
}
