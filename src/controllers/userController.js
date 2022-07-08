const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const {validateEmail,isValid,validISBN , regexNumber , regexValidator, passwordvalidate} = require('../validator/validation')


const createUser = async function(req,res){

let data =req.body
let { title, name, phone,email,password} = data
if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data "})}
if( ! isValid(phone) || !regexNumber(phone)){return res.status(400).send({msg:" please enter phone number correctly"})}

if(!isValid(title)){ return res.status(400).send({msg:"please enter title correctly"})}

if(!isValid(name) || !regexValidator(name)){ return res.status(400).send({msg:"please enter name correctly"}) }
if(!isValid(email) || ! validateEmail(email)){return res.status(400).send({msg:"please enter email correctly"}) }
if(!isValid(password) || ! passwordvalidate(password)) {return res.status(400).send({msg:"please enter password correctly"}) }

let checkemail = await userModel.findOne({email:email})

if(checkemail){return res.status(400).send({msg:"email is already regesterd "})}

let checkphone = await userModel.findOne({phone:phone})
if(checkphone){return res.status(400).send({msg:"phone is already regesterd "})}



let saveData = await userModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})

}

const loginUser = async function(req, res){

let data = req.body

let {email , password} = data
if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data "})}

if(!isValid(email) ||!validateEmail(email)) {return res.status(400).send({msg:"please enter email correctly"}) }

if(!isValid(password) || ! passwordvalidate(password)) {return res.status(400).send({msg:"please enter password correctly"}) }


let checkcredentials = await userModel.findOne({email:email,password:password})

if(!checkcredentials){ return res.status(400).send({msg:"please enter valid email or password "})}

userId = checkcredentials._id
let token = jwt.sign(
    {
        userId: userId.toString(),
        batch: "radon",
        organisation: "project-3",
    },
    "ourThirdProject" , {
        expiresIn:'600s'
    }
);
res.status(201).setHeader("x-api-key", token);
res.status(201).send({ status: true, token: token });


}






module.exports.createUser = createUser
module.exports.loginUser = loginUser