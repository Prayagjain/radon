const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const booksModel = require('../models/booksModel')



const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(401).send({ message: "no token found" })
        }
        // let a =  Math.round(new Date() / 1000)
        // console.log(a)
        
        let decodeToken = jwt.verify(token, "ourThirdProject")
        // if(a > decodeToken.exp){return res.send({msg:"token expired"})}
       
        if (!decodeToken) {
            return res.status(401).send({ message: "Invalid token" })
        }
        req.abcd = decodeToken
        next();
    }
    catch (err) {
        return res.status(500).send({status:false,  message: err.message })
    }
}


const authorisation = async function(req,res,next){
let data = req.body.userId
let decodeToken = req.abcd

let userid = decodeToken.userId




if(userid!=data) return res.status(403).send({ message: "you are not authorised " })

next()
    
}

const authorisation2 = async function(req,res,next){

    
    let param = req.params.bookId

    let decodeToken = req.abcd
    let userid = decodeToken.userId


    let finduser = await booksModel.findById(param)
    console.log(finduser)
    let userid1 = finduser.userId

if(userid != userid1){  return res.status(403).send({ message: "you are not authorised "})}

next()
}





module.exports.authentication = authentication
module.exports.authorisation = authorisation
module.exports.authorisation2 = authorisation2