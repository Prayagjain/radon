const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type: String,
               required: true,
              },
    authorName: {type:String,
                 required: true
                },
    category: {
        type: String,
        unique: true,
        required: true
    },
    year: {type: Number,
           required: true,
          },
    
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //users



// String, Number
// Boolean, Object/json, array