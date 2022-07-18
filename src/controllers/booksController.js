const mongoose = require('mongoose')
const booksModel = require('../models/booksModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const { isValid, validISBN, dateValidator } = require('../validator/validation')

//------------------------------------------------createBook----------------------------------------------//
const createBook = async function (req, res) {

 try {
      let data = req.body
      let uploadedFileURL = req.xyz
  let { title, excerpt, ISBN, category, subcategory, userId, releasedAt } = data
  data.bookCover = uploadedFileURL

  if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data" }) }
  if (!isValid(title)) { return res.status(400).send({ status: false, message: "please enter the title" }) }
  if (!isValid(excerpt)) { return res.status(400).send({ status: false, message: "please enter the excerpt" }) }
  if (!isValid(ISBN)) { return res.status(400).send({ status: false, message: "please enter the ISBN" }) }
  if (!(validISBN(ISBN))) { return res.status(400).send({ status: false, message: "ISBN is not valid" }) }
  if (!isValid(category)) { return res.status(400).send({ status: false, message: "please enter the category" }) }
  if (!isValid(subcategory)) { return res.status(400).send({ status: false, message: "please enter the subcategory" }) }
  if(!isValid(releasedAt)) {return res.status(400).send({ status: false, message: "please enter released date" })}
  if(!(dateValidator(releasedAt))) {return res.status(400).send({ status: false, message: "please enter valid date-format(yyyy-mm-dd) in releasedAt" })}
  if (!isValid(userId)) { return res.status(400).send({ status: false, message: "please enter the userId" }) }

  let checkUserId = await userModel.findOne({ _id: userId })
  if (!checkUserId) { return res.status(400).send({ status: false, message: "user does not exist" }) }

  let checkTitle = await booksModel.findOne({ title: title })
  if (checkTitle) { return res.status(400).send({ status: false, message: "title already exist" }) }

  let checkISBN = await booksModel.findOne({ ISBN: ISBN })
  if (checkISBN) { return res.status(400).send({ status: false, message: "ISBN already exist" }) }

  let saveData = await booksModel.create(data)

  return res.status(201).send({ status: true, message: 'Success', data: saveData })
  }catch(error){ res.status(500).send({ status:false,message:error.message})}
}



//------------------------------------------------getBooks----------------------------------------------//

const getBooks = async function (req, res) {
try {
     let data = req.query
     let { userId, category, subcategory } = data

  let obj = { 
    isDeleted: false 
  }
  if (userId) { obj.userId = userId }
  if (category) { obj.category = category }
  if (subcategory) { obj.subcategory = subcategory }

  let getBook = await booksModel.find(obj).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
  if (getBook.length == 0) { return res.status(404).send({ status: false, message: "No such books are available" }) }

  let sortbook = getBook.sort((a, b) => (a['title'] || "").toString().localeCompare((b['title'] || "").toString()));

  return res.status(200).send({ status: true, message: 'Book List', data: sortbook })
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------getBooksByParams----------------------------------------------//

const getBookByParams = async function (req, res) {
try {
     let data = req.params.bookId
     
  if (!mongoose.isValidObjectId(data)) { return res.status(400).send({ status: false, message: "please enter valid bookId" }) }
  let getBook = await booksModel.findOne({ _id: data ,isDeleted:false}, { __v: 0 ,deletedAt:0}).lean()
  if (!getBook) { return res.status(404).send({ status: false, message: "No such book is available or deleted" }) }
  let bookReview = await reviewModel.find({ bookId:data, isDeleted:false },{isDeleted: 0,createdAt: 0,updatedAt: 0,__v: 0})

  getBook.reviewsData = bookReview
  return res.status(200).send({ status: true, message: "Books list", data: getBook })
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------updateBooks----------------------------------------------//

const updateBooks = async function (req, res) {
try{ 
    let bookId = req.params.bookId
    let data = req.body
    let { title, excerpt, releasedAt, ISBN } = data

  if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data in body" }) }

  if(data.hasOwnProperty('ISBN')){
    if(ISBN.trim().length==0){return res.status(400).send({ status: false, message: "please enter something in ISBN" })}
    if (!(validISBN(ISBN))) { return res.status(400).send({ status: false, message: "ISBN is not valid" }) }
  }

  if(data.hasOwnProperty('title')){
    if(title.trim().length==0){return res.status(400).send({ status: false, message: "please enter something in title" })}
  }

  if(data.hasOwnProperty('excerpt')){
    if(excerpt.trim().length==0){return res.status(400).send({ status: false, message: "please enter something in excerpt" })}
  }

  if(data.hasOwnProperty('releasedAt')){
    if(releasedAt.trim().length==0){return res.status(400).send({ status: false, message: "please enter date in releasedAt" })}
    if(!(dateValidator(releasedAt))){return res.status(400).send({ status: false, message: "please enter valid date-format(yyyy-mm-dd) in releasedAt" })}
  }
  
  let getBook = await booksModel.findOne({$or:[{ title: title }, { ISBN: ISBN }]})
  if (getBook) { return res.status(400).send({ status: false, message: "title or ISBN already exist" }) }

  let updateBook = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true })
  if(!updateBook){ return res.status(404).send({ status: false, message: "This book is deleted" })}

  res.status(200).send({ status: true, message: 'Success', data: updateBook })
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------deleteByParams----------------------------------------------//

const deleteByParams = async function(req,res){
try {
     let bookId = req.params.bookId

  let deleteBook = await booksModel.findOneAndUpdate({_id:bookId , isDeleted:false}, {isDeleted:true, deletedAt:Date.now()})
  if(!deleteBook){ return res.status(404).send({ status: false, message: "Already deleted" })}

  res.status(200).send({ status: true, message: 'Success' })
  }
    catch(error){ res.status(500).send({ status:false,message:error.message})}
  }

module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookByParams = getBookByParams
module.exports.updateBooks = updateBooks
module.exports.deleteByParams = deleteByParams