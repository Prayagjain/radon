const bookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedBook= await bookModel.create(data)
    res.send({msg: savedBook})
}

const bookList= async function (req, res) {
    let allBook= await bookModel.find().select({bookName:1, authorName: 1, _id: 0})
    res.send({msg: allBook})
}
const getBooksInYear= async function (req, res){
    let allBook= await bookModel.find({ year : req.body.year })
    res.send({msg: allBook})   
}
const getParticularBooks= async function (req, res){
    let allBook= await bookModel.find(req.body)
    res.send({msg: allBook})
}
const getXINRBooks = async function (req, res){
    let allBook= await bookModel.find({$or: [{"prices.indianPrice": {$eq: "100INR"}},{"prices.indianPrice": {$eq: "200INR"}},{"prices.indianPrice": {$eq: "500INR"}}]})
    res.send({msg: allBook})
}
const getRandomBooks = async function (req, res){
    let allBook= await bookModel.find({$or: [{"totalPages": {$gt: 500}},{"stockAvailable": true}]})
    res.send({msg: allBook})
}

module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks