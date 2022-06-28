const mongoose = require('mongoose');
const validator = require('validator')

const authorSchema = new mongoose.Schema( {
  
     fname: {
        type : String,
        required : "First name is required",
        trim: true,
     }, 
     lname: {
        type : String,
        required : "Last name is required",
        trim: true
     }, 
     title: {
        type : String,
        required: "Title is required",
        enum : ['Mr', 'Mrs', 'Miss']
     },
      email: {
        type : String,
        required : "Email address is required",
        unique : true,
        trim: true,
        lowercase: true,
        validate : {
         validator : validator.isEmail,
         message : "Not a valid email",
         isAsync: false
        }
      },  
      password: {
        type : String,
        trim: true,
        required : "Password is required"
      }

},{ timestamps: true });

module.exports = mongoose.model('Author', authorSchema)