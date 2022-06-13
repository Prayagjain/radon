const { count } = require("console")
const purchaseModel = require("../models/purchaseModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const { findByIdAndUpdate } = require("../models/productModel")

const createPurchase =async function (req, res) {
    let purchase = req.body
    let header = req.headers.isfreeappuser

    if (header == "true"){
        purchase.amount = 0
        purchase.isFreeAppUser = true
        let purchaseCreated = await purchaseModel.create(purchase)
        res.send({purchase: purchaseCreated})
    }else if (header == "false"){
        let price = await productModel.findById(purchase.productId).select({price:1, _id:0})
        let balance = await userModel.findById(purchase.userId).select({balance:1, _id:0})

       if(price.price > balance.balance){
        res.send("You have insufficient Balance")
       }else if(price.price < balance.balance){
        let update = await userModel.findByIdAndUpdate(purchase.userId,{balance: balance.balance-price.price},{new: true})
        purchase.amount = price.price
        purchase.isFreeAppUser = false
        let purchaseCreated = await purchaseModel.create(purchase)
        res.send({msg:purchaseCreated, update })
       }
    }
}






const getBooksData = async function (req, res) {
    let allBooks = await BookModel.find({ authorName: "HO" })
    console.log(allBooks)
    if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
    else res.send({ msg: "No books found", condition: false })
}


const updateBooks = async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks = await BookModel.findOneAndUpdate(
        { authorName: "ABC" }, //condition
        { $set: data }, //update in data
        { new: true, upsert: true } ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT
    )

    res.send({ msg: allBooks })
}

const deleteBooks = async function (req, res) {
    // let data = req.body 
    let allBooks = await BookModel.updateMany(
        { authorName: "FI" }, //condition
        { $set: { isDeleted: true } }, //update in data
        { new: true } ,
    )

    res.send({ msg: allBooks })
}



const totalSalesPerAuthor = async function (req, res) {
    // let data = req.body 
    let allAuthorSales = await BookModel.aggregate(
        [
            { $group: { _id: "$authorName", totalNumberOfSales: { $sum: "$sales" } } },
            { $sort: { totalNumberOfSales: -1 } }
        ]
    )

    res.send({ msg: allAuthorSales })
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createPurchase = createPurchase
module.exports.getBooksData = getBooksData
module.exports.updateBooks = updateBooks
module.exports.deleteBooks = deleteBooks
module.exports.totalSalesPerAuthor = totalSalesPerAuthor
