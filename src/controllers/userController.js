const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const {validateEmail,isValid,validISBN , regexNumber , regexValidator, passwordvalidate} = require('../validator/validation')


const createUser = async function(req,res){

let data =req.body
let { title, name, phone,email,password} = data

if( ! isValid(phone) || !regexNumber(phone)){return res.status(400).send({msg:" please enter phone number correctly"})}

if(!isValid(title)){ return res.status(400).send({msg:"please enter title correctly"})}

if(!isValid(name) || !regexValidator(name)){ return res.status(400).send({msg:"please enter name correctly"}) }
if(!isValid(email) || ! validateEmail(email)){return res.status(400).send({msg:"please enter email correctly"}) }
if(!isValid(password) || ! passwordvalidate(password)) {return res.status(400).send({msg:"please enter password correctly"}) }




let saveData = await userModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})





}

module.exports.createUser = createUser