const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const booksModel = require('../models/booksModel')



const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(401).send({ error: "no token found" })
        }
        // let a =  Math.round(new Date() / 1000)
        // console.log(a)
        
        let decodeToken = jwt.verify(token, "ourThirdProject")
        // if(a > decodeToken.exp){return res.send({msg:"token expired"})}
       
        if (!decodeToken) {
            return res.status(401).send({ error: "Invalid token" })
        }
        next();
    }
    catch (err) {
        return res.status(500).send({status:false,  message: err.message })
    }
}


module.exports.authentication = authentication