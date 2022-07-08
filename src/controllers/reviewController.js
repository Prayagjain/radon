const mongoose = require('mongoose');
const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel')


const createReview = async function(req,res){
// try{
let data =req.body

let { reviewedBy , rating } = data
let bookId = req.params.bookId
data.bookId = bookId

if(!data) { return res.status(400).send({ status: false, message: "please enter the data" }) }

if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }
if(!bookId) { return res.status(400).send({ status: false, message: "please provide bookId" }) }
if(!reviewedBy) { return res.status(400).send({ status: false, message: "please enter the name reviewed book by the person" }) }
if(!rating) { return res.status(400).send({ status: false, message: "please enter ratings" }) }

let findbook1 = await booksModel.findOne({_id:bookId})
let review1 = findbook1.reviews + 1


let findbook = await booksModel.findOneAndUpdate({_id:bookId},{reviews:review1},{new:true})

let saveData = await reviewModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})

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


let findbook = await booksModel.findById(bookId)
if(!findbook){  return res.status(404).send({ status: false, message: "book does not exist" }) }


    let updatereview = await reviewModel.findOneAndUpdate({ _id:reviewId , isDeleted: false},{ reviewedBy:reviewedBy , rating:rating , review:review },{new:true})
    
    return res.status(200).send({  status: true, message: 'Success', data:updatereview})
    }
    catch(error){
res.status(500).send({ status:false,message:error.message})
    }

}

const deletereview = async (req,res)=>{
    
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId

    let deletereview = await reviewModel.updateOne({_id:reviewId , isDeleted:false}, {isDeleted:true},{new:true})

    let findbook1 = await booksModel.findOne({_id:bookId})
    let review1 = findbook1.reviews - 1

    let deleteBookReview = await booksModel.updateOne({_id:bookId , isDeleted:false},{reviews:review1},{new:true}) 



 return res.status(200).send({  status: true, message: 'Success'})
}



module.exports.createReview= createReview
module.exports.updatereview = updatereview
module.exports.deletereview = deletereview