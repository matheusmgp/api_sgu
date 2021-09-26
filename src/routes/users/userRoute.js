const { celebrate, Segments  } = require('celebrate');
const express = require('express')
const UserController = require('../../controllers/UserController')
const validation = require('../../validators/UserValidator')
const authMiddleware = require('../../middlewares/auth')


const routes = express.Router();
//routes.use(authMiddleware);

routes.get('/users', UserController.findAll);

routes.post('/users', celebrate({[Segments.BODY]: validation.post }), UserController.create);

routes.patch('/users/:_id', UserController.update);

routes.get('/users/:_id',celebrate({[Segments.PARAMS]: validation.get_delete }), UserController.findById);

routes.delete('/users/:_id',celebrate({[Segments.PARAMS]: validation.get_delete }), UserController.delete);


module.exports = routes;