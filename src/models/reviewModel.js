const mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId
/*------------------------------------------Book Schema:-------------------------------------------*/
const reviewSchema = new mongoose.Schema({


    bookId: {
        type: ObjectId,
        required: true,
        ref: 'book'
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest'
    },
    reviewedAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },




}, { timestamps: true });


/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = mongoose.model('review', reviewSchema)  // book