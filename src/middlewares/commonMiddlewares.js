const purchaseModel = require("../models/purchaseModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const mid1= function ( req, res, next) {
    let reqheader = req.headers.isfreeappuser
    if (!reqheader){
        res.send("error")
    }else {
        next()
    }
}

const mid2=async function ( req, res, next) {
    let data= req.body
    if (Boolean(data.userId) === true && Boolean(data.productId) === true){
        let id1 = await productModel.find().select({_id:1})
        let productId1 = id1.map((obj)=>{return obj._id.toString()}) 
        let id2 = await userModel.find().select({_id:1})
        let userId2 = id2.map((obj)=>{return obj._id.toString()})
         if(productId1.includes(data.productId) &&  userId2.includes(data.userId)) {
            next()
        } else if (productId1.includes(data.productId)){
            res.send("Invalid userId")
        }else if(userId2.includes(data.userId)){
            res.send("Invalid productId")
        }else {
            res.send("Both uderId and productId are invalid")
        }

  }
  else if(Boolean(data.userId) !== true && Boolean(data.productId) !== true) {
        res.send("Both userId and productId is required")
  }else if(Boolean(data.productId) !== true){
        res.send("productId is required")
  }else if(Boolean(data.userId) !== true){
        res.send("userId is required")
  }
}


const mid3= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}

module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4
