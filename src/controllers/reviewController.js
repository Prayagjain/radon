const mongoose = require('mongoose');
const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel')
const { isValid,ratingValidator,regexValidator } = require('../validator/validation')

const createReview = async function(req,res){
let data =req.body
let bookId = req.params.bookId
console.log(bookId)
let { reviewedBy , rating ,review} = data

if(Object.keys(data).length==0) { return res.status(400).send({ status: false, message: "please enter the data" }) }
if(!bookId) { return res.status(400).send({ status: false, message: "please provide bookId" }) }
if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }
data.bookId = bookId
if(!isValid(reviewedBy) || !regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the name reviewed book by the person" }) }
if(!isValid(rating) || !ratingValidator(rating)) { return res.status(400).send({ status: false, message: "please enter ratings" }) }
if(!isValid(review)) { return res.status(400).send({ status: false, message: "please enter review" }) }

// let findbook1 = await booksModel.findOne({_id:bookId})
// if(!findbook1){return res.status(400).send({ status: false, msg: "No such book available" })}
// let review1 = findbook1.reviews + 1


let findbook = await booksModel.findOneAndUpdate({_id:bookId,isDeleted:false},{$inc:{reviews:1}},{new:true})
if(!findbook){return res.status(400).send({ status: false, msg: "No such book available or the Book is Deleted" })}
let saveData = await reviewModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:findbook})

// }
// catch(error){
//     res.status(500).send({status:false,message:error.message})
// }
}

const updatereview = async function(req,res){
    try{
let bookId = req.params.bookId
let reviewId = req.params.reviewId

    let data = req.body
    let {reviewedBy , rating , review } = data
if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }
if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, msg: "please enter  valid reviewId" }) }
if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data " }) }
if(!regexValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter the name reviewed book by the person" }) }
if(rating){
if(!ratingValidator(rating)) { return res.status(400).send({ status: false, message: "please enter ratings" }) }
}
let findbook = await booksModel.findOne({_id:bookId, isDeleted:false},{__v: 0 ,deletedAt:0}).lean()
if(!findbook){  return res.status(404).send({ status: false, message: "book does not exist or deleted" }) }

let updatereview = await reviewModel.findOneAndUpdate({ _id:reviewId ,bookId:bookId, isDeleted: false},{ reviewedBy:reviewedBy , rating:rating , review:review },{new:true})
if(!updatereview){return res.status(404).send({ status: false, message: "review does not exist or Wrong reviewId for the provided bookId" })}
let bookReview = await reviewModel.find({ bookId: bookId },{isDeleted: 0,createdAt: 0,updatedAt: 0,__v: 0})
findbook.reviewsData = bookReview
    return res.status(200).send({  status: true, message: 'Success', data:findbook})
    }
    catch(error){
        console.log(error)
res.status(500).send({ status:false,message:error.message})
    }

}

const deletereview = async (req,res)=>{
    
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId

    if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }
if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, msg: "please enter  valid reviewId" }) }

 let bookCheck = await booksModel.findOne({_id:bookId,isDeleted:false})
 if(!bookCheck){return res.status(404).send({ status: false, message: "book does not exist or deleted" })}

    let deletereview = await reviewModel.updateOne({_id:reviewId ,bookId:bookId, isDeleted:false}, {isDeleted:true},{new:true})
     if(deletereview.modifiedCount==0){return res.status(404).send({ status: false, message: "review does not exist or Wrong reviewId for the provided bookId" })}
    // let findbook1 = await booksModel.findOne({_id:bookId})
    // let review1 = findbook1.reviews - 1

    let deleteBookReview = await booksModel.updateOne({_id:bookId , isDeleted:false},{$inc:{reviews:-1}},{new:true}) 



 return res.status(200).send({  status: true, message: 'Success'})
}



module.exports.createReview= createReview
module.exports.updatereview = updatereview
module.exports.deletereview = deletereview