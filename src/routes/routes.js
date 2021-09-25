const express = require('express')
const router = express.Router();

//routes
const userRoutes = require('./users/userRoute')

module.exports = function(app){
    
    app.use('', userRoutes)
    
}
