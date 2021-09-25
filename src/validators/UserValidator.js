const { Joi } = require('celebrate')

const post = Joi.object().keys({
    email: Joi.string().required().max(55).email(),
    password: Joi.string().max(20).required(),
    cnpj: Joi.string().max(20).required(),
    name: Joi.string().max(35).required(),
})

const update = Joi.object().keys({
    _id: Joi.required(),
    email: Joi.string().required().max(55).email(),
    password: Joi.string().max(20).required(),
    cnpj: Joi.string().max(20).required(),
    name: Joi.string().max(35).required(),
})

const get_delete = {  _id: Joi.required() } 

module.exports = {
    post,
    update,
    get_delete
    //pathSchema
}