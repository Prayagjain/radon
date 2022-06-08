const bookModel= require("../models/bookModel")
const authorModel = require("../models/authorModel")


const createBook= async function (req, res) {
    let data= req.body
    let saved= await bookModel.create(data)
    res.send({msg: saved})
}

const createAuthor= async function (req, res) {
    let data= req.body
    let saved= await authorModel.create(data)
    res.send({msg: saved})
}

const bookList= async function (req, res) {
    let authorId= await authorModel.findOne({authorName: "Chetan Bhagat"}).select({authorId:  1, _id: 0})
    let authorBooks = await bookModel.find(authorId)
    res.send({msg: authorBooks})
}
const getBooksInYear= async function (req, res){
    let authorId= await bookModel.findOne({bookName: "Two States"}).select({authorId:  1, _id: 0})
    let authorBooks = await authorModel.find(authorId).select({authorName: 1, _id: 0})
    let priceUpdate = await bookModel.findOneAndUpdate(
        {bookName: "Two States"},
        {$set: {price: 100}},
        {new: true},
    )
    let price = priceUpdate.price
    res.send({msg: authorBooks, price})
}
const getXINRBooks = async function (req, res){
    let allBook= await bookModel.find({price : { $gte: 50}  ,  price: {$lte: 100}}).select({authorId:  1, _id: 0})
    let authors = []
    for (let i=0; i<allBook.length; i++){
        let b = await authorModel.findOne(allBook[i]).select({authorName: 1, authorId:1, _id: 0})
        authors.push(b)
    }
    res.send({msg: authors})
}
const bookByAuthorId = async function (req, res) {
    let allBook = await bookModel.find({authorId: req.params.authorId}).select({bookName: 1, _id:0}) 
    res.send({msg: allBook})
}
const findAuthor = async function (req, res) {
    let results = []
    let allBook = await bookModel.find({rating: {$gt: 4}}).select({authorId: 1, _id:0}) 
    for (let i=0;i<allBook.length;i++){
        let authors = await authorModel.findOne(allBook[i]).select({authorName:1, age:1, _id:0})
         if(authors.age > 50)  { 
             results.push(authors)
            }
    }
    res.send({msg: results })
}


module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getXINRBooks = getXINRBooks
module.exports.bookByAuthorId = bookByAuthorId
module.exports.findAuthor = findAuthor
