const UserRepository = require('../repository/UserRepository')
const bcrypt = require('bcryptjs')
module.exports = {

    async find(){
        const retorno = await UserRepository.findAll();
        return !retorno ? { message: 'Não foi possivel retornar os usuários'} : retorno;    
    },

    async findOne(_id){       
        const retorno = await UserRepository.findById( _id );
        return !retorno ? { message: 'Usuário não encontrado'} : retorno;
    },

    async create(payload){
        const {  email,password,password_repeat,cnpj } = payload

        
        if(password != password_repeat) return { ...payload, message: 'Senhas divergente'}

        if(await UserRepository.findOne({email: email})) return { ...payload, message: 'E-mail já cadastrado'}

        if(await UserRepository.findOne({cnpj: cnpj})) return {...payload,  message: 'CNPJ já cadastrado'}

        const created = await UserRepository.create(payload);

        let retorno = {
            created,
            message: ''
        }

        return !retorno ? { message: 'Não foi possivel cadastrar'} :  retorno;
           
    },

    async update(_id, payload){ 
        const {  email,password,password_repeat,cnpj , status} = payload
        var oldUser = await UserRepository.findOne({_id: _id})

        if(password != '' && password_repeat != ''){

            if(password != password_repeat) return { ...payload, message: 'Senhas divergentes'}

            const hash = await bcrypt.hash(password, 10);
            payload.password = hash; 

        }else{
            payload.password = oldUser.password
            payload.password_repeat = oldUser.password_repeat
        }
        
        var newUserEmail = await UserRepository.findOne({email: email})
        var newUserCnpj = await UserRepository.findOne({cnpj: cnpj})

        if(newUserEmail){
            if(oldUser.email != newUserEmail.email) return { ...payload, message: 'E-mail já cadastrado'} 
        }
        if(newUserCnpj){
            if(oldUser.email != newUserCnpj.email) return { ...payload, message: 'CNPJ já cadastrado'}
        }

        
        const updated = await UserRepository.update(_id, payload);
        let retorno = {
            updated,
            message: ''
        }
        return !retorno ?  { ...payload, message: 'Não foi possivel cadastrar'} : retorno;
    },

    async delete(_id){
        const retorno = await UserRepository.delete(_id);
        return !retorno ? null : retorno;
    },


}