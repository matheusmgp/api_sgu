
const httpResponse = require('../httpResponse/httpResponse');
const AuthService = require('../services/AuthService')

module.exports = {

    
    async authenticate(req, res){
        const {  email , password ,cnpj } = req.body
        let payload = { email, password,cnpj }

        const user = await AuthService.authenticate(payload);
        httpResponse.responseStatus(user, res);       
    },


}