const { celebrate, Segments  } = require('celebrate');
const express = require('express')
const AuthController = require('../../controllers/AuthController')
const validation = require('../../validators/AuthValidaor')

const routes = express.Router();



routes.post('/authenticate', celebrate({[Segments.BODY]: validation.post }), AuthController.authenticate);



module.exports = routes;