const UserRepository = require('../repository/UserRepository') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
module.exports = {

    async authenticate(payload){  
       const { email, password } = payload

        const user = await UserRepository.findOne(email);

        if(!user) return null

        if(!await bcrypt.compare(password, user.password)) return null

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