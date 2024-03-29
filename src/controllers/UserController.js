
const httpResponse = require('../httpResponse/httpResponse');
const UserService = require('../services/UserService')


module.exports = {

    async findAll(req, res){
        const users = await UserService.find();
        httpResponse.responseStatus(users, res);       
    },

    async findById(req, res){
        const { _id } = req.params
        const user = await UserService.findOne( _id );
       
        httpResponse.responseStatus(user, res);       
    },

    async create(req, res){
        const { name, email , password ,password_repeat,cnpj } = req.body
        let payload = { name, email, password, password_repeat, cnpj}

        const retorno = await UserService.create(payload);
        httpResponse.responseStatus(retorno, res);       
    },

    async update(req, res){
       
        const { _id, name, email , password ,password_repeat,cnpj, status} = req.body
        let payload = { _id,name, email, password,password_repeat ,cnpj, status}

        const user = await UserService.update( _id , payload);
        httpResponse.responseStatus(user, res); 
    },

    async delete(req, res){
        const { _id } = req.params
        const user = await UserService.delete( _id );
        httpResponse.responseStatus(user, res); 
    },


}