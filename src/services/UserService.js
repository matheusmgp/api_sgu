const UserRepository = require('../repository/UserRepository')
module.exports = {

    async find(){
        const retorno = await UserRepository.findAll();
        return !retorno ? null : retorno;    
    },

    async findOne(_id){       
        const retorno = await UserRepository.findById( _id );
        return !retorno ? null : retorno;
    },

    async create(payload){
        //const { name, email , password ,cnpj } = payload
        const retorno = await UserRepository.create(payload);
        return !retorno ? null : retorno;
           
    },

    async update(_id, payload){  
        const retorno = await UserRepository.update(_id, payload);
        return !retorno ? null : retorno;
    },

    async delete(_id){
        const retorno = await UserRepository.delete(_id);
        return !retorno ? null : retorno;
    },


}