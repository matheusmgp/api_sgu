const { Joi } = require('celebrate')

const post = Joi.object().keys({
    email: Joi.string().required().max(55).email(),
    password: Joi.string().max(20).required()    
})


module.exports = {
    post
    
}