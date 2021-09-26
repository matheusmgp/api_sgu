const UserRepository = require('../repository/UserRepository') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const crypto = require('crypto')
const mailer = require('../modules/mailer')


module.exports = {

    async authenticate(payload){  
       const { email, password ,cnpj} = payload

        const user = await UserRepository.findOne({email,cnpj});       
        if(!user) return { message: "Usuário, senha, ou CNPJ inválidos"}

        if(!await bcrypt.compare(password, user.password)) return { message: "Usuário, senha, ou CNPJ inválidos"}

        user.password = undefined;
        
        let retorno = { 
            user, 
            token:this.generateToken({ id : user.id}) 
        }

        return retorno;
    },
    async forgotPassword(payload){
        const { email } = payload
        try {
            
            const user = await UserRepository.findOne({email}); 
            
            if(!user) return { email, message: "Usuário não encontrado"}

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await UserRepository.update(user.id,{
                '$set':{
                    passwordResetToken : token,
                    passwordResetExpires: now
                }
            })

            mailer.sendMail({

                to: email,
                from: 'matheus_mgp@hotmail.com',
                template: 'auth/forgot_password',
                context: { token }
            },(err) => {
                if(err) return { message: 'err sender ' + err }                
            });
          
            return { email, message: ""}

        } catch (error) {
            return { email, message: 'err catch' + error}
        }
    },
    async resetPassword(payload){
        const { email, password, password_repeat,token } = payload
        try {

            if(password != password_repeat) return { ...payload, message: 'Senhas divergente'}

            const user = await UserRepository.findOneResetPass({email});           

            if(!user) return { ...payload, message: "Usuário não encontrado"}

            if(token != user.passwordResetToken) return { ...payload, message: "Token Inválido"}

            const now = new Date()
            if(now > user.passwordResetExpires) return { ...payload, message: "Token expirado"}

            const hash = await bcrypt.hash(password, 10);
            user.password = hash; 
          

            const updated = await UserRepository.update(user.id, user);

            let retorno = { 
                updated, 
                message: 'Senha recuperada com sucesso.'
            }
            return { ...retorno, message: ""}
           
        } catch (error) {
            return { message: 'err catch' + error}
        }
    },
    generateToken(params = {}){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400
        })
    }

}