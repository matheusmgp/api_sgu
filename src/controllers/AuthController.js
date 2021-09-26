
const httpResponse = require('../httpResponse/httpResponse');
const AuthService = require('../services/AuthService')

module.exports = {

    
    async authenticate(req, res){
        const {  email , password ,cnpj } = req.body
        let payload = { email, password,cnpj }

        const user = await AuthService.authenticate(payload);
        httpResponse.responseStatus(user, res);       
    },

    async forgotPassword(req, res){
        const {  email  } = req.body
        let payload = { email }

        const retorno = await AuthService.forgotPassword(payload);
      
        httpResponse.responseStatus(retorno, res);       
    },
    async resetPassword(req, res){
        const {  email, token , password  } = req.body
        let payload = { email, token , password }

        const retorno = await AuthService.resetPassword(payload);
        console.log(retorno)
        httpResponse.responseStatus(retorno, res);     
    }


}