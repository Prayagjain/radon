const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const purchaseSchema = new mongoose.Schema( {
    userId: {
        type: ObjectId,
        ref: "User"
    }, 
    producdId: {
        type: ObjectId,
        ref: "Product"
    }, 
    amount: Number,
    date: String,
    isFreeAppUser: Boolean,
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    //  }
    //isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")

}, { timestamps: true });


module.exports = mongoose.model('Purchase', purchaseSchema) //users
