const mongoose = require('mongoose');

/*------------------------------------------User Schema:-------------------------------------------*/
const userSchema = new mongoose.Schema({
    
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"]
        },
        name: {
            type: String,
            required: true,
            trim:true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true
        },
        password: {
            type: String,
            required: true,
            trim:true,
            minLength:8,
            maxLength:15
        },
        address: {
            street:String,
            city:String,
            pincode:String
        },
    }, { timestamps: true });


/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = mongoose.model('user', userSchema)  // user