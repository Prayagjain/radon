const mongoose = require('mongoose')
const booksModel = require('../models/booksModel')
const userModel = require('../models/userModel')
const { isValid, validISBN } = require('../validator/validation')


const createBook = async function (req, res) {

  let data = req.body
  let { title, excerpt, ISBN, category, subcategory, userId } = data

  if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data " }) }

  if (!isValid(title)) { return res.status(400).send({ status: false, message: "please enter the title" }) }

  if (!isValid(excerpt)) { return res.status(400).send({ status: false, message: "please enter the excerpt" }) }

  if (!(validISBN(ISBN))) { return res.status(400).send({ status: false, message: "ISBN is not valid" }) }

  if (!isValid(ISBN)) { return res.status(400).send({ status: false, message: "please enter the ISBN" }) }

  if (!isValid(category)) { return res.status(400).send({ status: false, message: "please enter the category" }) }

  if (!isValid(subcategory)) { return res.status(400).send({ status: false, message: "please enter the subcategory" }) }

  if (!isValid(userId)) { return res.status(400).send({ status: false, message: "please enter the userId" }) }

  if (!mongoose.isValidObjectId(userId)) { return res.status(400).send({ status: false, msg: "please enter  valid userId" }) }

  let checkuserId = await userModel.findOne({ _id: userId })
  if (!checkuserId) { return res.status(400).send({ status: false, message: "user does not exist" }) }

  let checktitle = await booksModel.findOne({ title: title })
  if (checktitle) { return res.status(400).send({ status: false, message: " title already exist" }) }

  let checkISBN = await booksModel.findOne({ ISBN: ISBN })
  if (checkISBN) { return res.status(400).send({ status: false, message: " ISBN already exist" }) }

  let saveData = await booksModel.create(data)

  return res.status(201).send({ status: true, message: 'Success', data: saveData })


}


const getbooks = async function (req, res) {

  let data = req.query
  let { userId, category, subcategory } = data

  let obj = { isDeleted: false }

  if (userId) { obj.userId = userId }

  if (category) { obj.category = category }

  if (subcategory) { obj.subcategory = subcategory }

  let getbook = await booksModel.find(obj).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
  if (getbook.length == 0) { return res.status(404).send({ status: false, message: "No such books are available " }) }


  let sortbook = getbook.sort((a, b) => (a['title'] || "").toString().localeCompare((b['title'] || "").toString()));

  return res.status(200).send({ status: true, message: 'Book List', data: sortbook })

}

const getbookByparams = async function (req, res) {

  let data = req.params.bookId
  if (!data) { return res.status(404).send({ status: false, message: "please enter bookId" }) }
  if (!mongoose.isValidObjectId(data)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }
  let getbook = await booksModel.findOne({ id: data }, { "_v": 0 }).lean()
  if (!getbook) { return res.status(404).send({ status: false, message: "No such book is available " }) }
  let bookReview = await reviewModel.find({ bookId: data })

  getbook.reviewsData = bookReview

  return res.status(200).send({ status: true, message: " Books list", data: getbook })

}

const updatebooks = async function (req, res) {
  let bookId = req.params.bookId
  if (!bookId) { return res.status(400).send({ status: false, message: "Please enter BookId in params" }) }
  let data = req.body
  if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "please enter the data " }) }
  let { title, excerpt, releasedAt, ISBN } = data
  let getbook = await booksModel.findOne({$or:[{ title: title }, { ISBN: ISBN }]})
  if (!getbook) { return res.status(400).send({ status: false, message: "title or ISBN already exist" }) }


  let updatebook = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true })

  res.status(200).send({ status: true, message: 'Success', data: updatebook })
}


const deleteByParams = async function(req,res){

  let data = req.params.bookId
  if(!data){return res.status(400).send({ status: false, message: "Please enter data in params" })}

  if (!mongoose.isValidObjectId(data)) { return res.status(400).send({ status: false, msg: "please enter  valid bookId" }) }

  let deletebook = await booksModel.findOneAndUpdate({_id:data , isDeleted:false}, {isDeleted:true, deletedAt:Date.now()} , {new:true})

  if(!deletebook){ return res.status(404).send({ status: false, msg: "book dosen't exist or already deleted " })}

     res.status(200).send({ status: true, message: 'Success' })
}


module.exports.createBook = createBook
module.exports.getbooks = getbooks
module.exports.getbookByparams = getbookByparams
module.exports.updatebooks = updatebooks
module.exports.deleteByParams = deleteByParams