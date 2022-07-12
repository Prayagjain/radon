const mongoose = require('mongoose');
const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel')
const { isValid,ratingValidator,regexValidator } = require('../validator/validation')

//------------------------------------------------createReview----------------------------------------------//

const createReview = async function(req,res){
try{
   let data =req.body
   let bookId = req.params.bookId
   let { reviewedBy , rating ,review} = data

if(Object.keys(data).length==0) { return res.status(400).send({ status: false, message: "please enter the data" }) }
if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }
data.bookId = bookId

if(data.hasOwnProperty('reviewedBy')){
if(!isValid(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the reviewer name" }) }
if(!regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the reviewer name correctly" }) }
}

if(!isValid(rating)) { return res.status(400).send({ status: false, message: "please enter ratings" }) }
if(!ratingValidator(rating)) { return res.status(400).send({ status: false, message: "please enter ratings between 1 to 5" }) }
if(!isValid(review)) { return res.status(400).send({ status: false, message: "please enter review" }) }

let findBook = await booksModel.findOneAndUpdate({_id:bookId,isDeleted:false},{$inc:{reviews:1}},{new:true}).select({__v: 0,deletedAt:0}).lean()
if(!findBook){return res.status(400).send({ status: false, message: "No such book available or the Book is Deleted" })}
let saveData = await reviewModel.create(data)
findBook.reviewsData = saveData
return res.status(201).send({  status: true, message: 'Success', data:findBook})
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------updateReviews----------------------------------------------//

const updateReview = async function(req,res){
try{
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId
    let data = req.body
    let {reviewedBy , rating , review } = data

if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter  valid bookId" }) }
if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "please enter  valid reviewId" }) }
if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data" }) }

if(data.hasOwnProperty('reviewedBy')){
if(!regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the name correctly" }) }
}

if(data.hasOwnProperty('rating')){
if(!(typeof rating == 'number')) { return res.status(400).send({ status: false, message: "please enter rating in Numbers" }) }
if(!ratingValidator(rating)) { return res.status(400).send({ status: false, message: "please enter rating between 1 to 5" }) }
}

if(data.hasOwnProperty('review')){
if(typeof review != "string"){return res.status(400).send({ status: false, message: "please enter review in correct type" })}
if(review.trim().length == 0){return res.status(400).send({ status: false, message: "please enter something in review " })}
}

let findBook = await booksModel.findOne({_id:bookId, isDeleted:false},{ __v: 0 ,deletedAt:0}).lean()
if(!findBook){  return res.status(404).send({ status: false, message: "book does not exist or deleted" }) }

let updateReview = await reviewModel.findOneAndUpdate({ _id:reviewId ,bookId:bookId, isDeleted: false},{ reviewedBy:reviewedBy , rating:rating , review:review },{new:true})
if(!updateReview){return res.status(404).send({ status: false, message: "No such review exist for this book" })}
findBook.reviewsData = updateReview
    return res.status(200).send({  status: true, message: 'Success', data: findBook})
}
catch(error){res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------deleteReviews----------------------------------------------//

const deleteReview = async (req,res)=>{
try {
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId

 if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "please enter valid bookId" }) }
 if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "please enter valid reviewId" }) }

 let bookCheck = await booksModel.findOne({_id:bookId,isDeleted:false})
 if(!bookCheck){return res.status(404).send({ status: false, message: "book does not exist or deleted" })}

 let deleteReview = await reviewModel.updateOne({_id:reviewId ,bookId:bookId, isDeleted:false}, {isDeleted:true},{new:true})
 if(deleteReview.modifiedCount==0){return res.status(404).send({ status: false, message: "No such review exist for this book" })}

 let deleteBookReview = await booksModel.updateOne({_id:bookId , isDeleted:false},{$inc:{reviews:-1}}) 

 return res.status(200).send({  status: true, message: 'Success'})
}
 catch(error){ res.status(500).send({ status:false,message:error.message})}
}

module.exports.createReview= createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview