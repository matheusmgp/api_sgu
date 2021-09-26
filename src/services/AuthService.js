const UserRepository = require('../repository/UserRepository') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
module.exports = {

    async authenticate(payload){  
       const { email, password } = payload

        const user = await UserRepository.findOne({email});
        console.log(user)
        if(!user) return null

        if(!await bcrypt.compare(password, user.password)) return { message: "Dados Inválidos"}

        user.password = undefined;

        
        let retorno = { 
            user, 
            token:this.generateToken({ id : user.id}) 
        }

        return retorno;
    },

    generateToken(params = {}){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400
        })
    }

}