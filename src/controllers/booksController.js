const express = require('express')
const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')
const {validateEmail,isValid,validISBN , regexNumber} = require('../validator/validation')


const createBook = async function(req,res){

let data =req.body
let {title,excerpt,ISBN,category, subcategory, releasedAt} = data

if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data "})}

if(!isValid(title)){return res.status(400).send({status: false, message: "please enter the title"})}

if(!isValid(excerpt)){return res.status(400).send({status: false, message: "please enter the excerpt"}) }

if(!(validation.validISBN(ISBN))){ return res.status(400).send({status: false, message: "ISBN is not valid"})}

if(!isValid(ISBN)){return  res.status(400).send({status: false, message: "please enter the ISBN"})}
if(!isValid(category)){return res.status(400).send({status: false, message: "please enter the category"})}
if(!isValid(subcategory)){return res.status(400).send({status: false, message: "please enter the subcategory"})}
if(!isValid(releasedAt)){return res.status(400).send({status: false, message: "please enter the releasedAt"})}

let saveData = await booksModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})


}

module.exports.createBook = createBook