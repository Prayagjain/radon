const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
/*------------------------------------------Book Schema:-------------------------------------------*/
const bookSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    excerpt: {
        type: String,
        required: true,
        trim:true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    category: {
        type: String,
        required: true,
        trim:true
    },
    subcategory: [{type: String,trim:true,required: true}],

    reviews: {
        type: Number,
        default: 0,
    },
    deletedAt: {
       type:Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
      type:Date,
      required:true
    },
    bookCover:{
        type:String,
        trim:true
    }
}, { timestamps: true });


/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = mongoose.model('book', bookSchema)  // book