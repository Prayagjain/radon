const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type: String,
               required: true,
              },
     price : Number,
     authorId :{ type: Number,
                required: true,
              },
     rating : Number
    
    
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) 