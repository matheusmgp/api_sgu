
const httpResponse = require('../httpResponse/httpResponse');
const AuthService = require('../services/AuthService')

module.exports = {

    
    async authenticate(req, res){
        const {  email , password  } = req.body
        let payload = { email, password }

        const user = await AuthService.authenticate(payload);
        httpResponse.responseStatus(user, res);       
    },


}