const { Joi } = require('celebrate')

const post = Joi.object().keys({
    email: Joi.string().required().max(55).email(),
    password: Joi.string().max(8).required(),
    cnpj: Joi.string().max(14).required()     
})


module.exports = {
    post
    
}