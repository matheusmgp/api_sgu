const mongoose = require('../infra/database')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type:String,
        required: true,
        select: false,
        //set: value =>
           // crypto
              //  .createHash('md5')
             //   .update(value)
              //  .digest('hex')
    },
    cnpj: {
        type:String,
        required: true,
        unique: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    toJSON: { virtuals : true , getters : true},
    toObject : { virtuals : true , getters : true}
}


);

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash; 
})
UserSchema.pre('upload', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash; 
})
const User = mongoose.model('User', UserSchema);

module.exports = User;