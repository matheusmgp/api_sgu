const User = require('../models/user');


module.exports = {

    async findAll(){
        return await User.find();       
    },

    async findById(_id){       
       return await User.findOne({ _id });          
    },

    async create(payload){      
        return await User.create(payload);     
    },

    async update(_id, payload){
        return  await User.findByIdAndUpdate({ _id }, payload, { new : true });        
    },

    async delete(_id){       
       return await User.findByIdAndDelete({ _id });        
    },


    //authentication methods
    async findOne(email){       
        return await User.findOne({ email }).select('+password');          
     },


}
