const express = require('express')
const jwt = require('jsonwebtoken')
const reviewModel = require('../models/reviewModel')


const createReview = async function(req,res){

let data =req.body
let saveData = await reviewModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})





}

module.exports.createReview= createReview