 const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const {validateEmail,isValid , regexNumber , regexValidator, passwordValidate} = require('../validator/validation')

//------------------------------------------------createUser----------------------------------------------//

const createUser = async function(req,res){
  try{
     let data =req.body
     let { title, name, phone,email,password,address} = data
     let titleValues = ["Mr","Mrs", "Miss"];
if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data"})}
if(!isValid(phone)){return res.status(400).send({status:false, message:" please enter phone number"})}
if(!regexNumber(phone)){return res.status(400).send({status:false, message:" please enter valid phone number"})}
if(!isValid(title)){ return res.status(400).send({status:false, message:"please enter title"})}
if(!titleValues.includes(title)){ return res.status(400).send({status:false, message:"please enter title correctly"})}
if(!isValid(name)){ return res.status(400).send({status:false, message:"please enter name"})}
if(!regexValidator(name)){ return res.status(400).send({status:false, message:"please enter name correctly"})}
if(!isValid(email)){return res.status(400).send({status:false, message:"please enter email"})}
if(!validateEmail(email)){return res.status(400).send({status:false, message:"please enter valid email"})}
if(!isValid(password)) {return res.status(400).send({status:false, message:"please enter password"})}
if(!passwordValidate(password)) {return res.status(400).send({status:false, message:"please enter valid password"})}
if(data.hasOwnProperty('address')){
    if(typeof address != "object"){return res.status(400).send({status:false, message:"Type of address is not an object"})}
}

let checkEmail = await userModel.findOne({email:email})
if(checkEmail){return res.status(400).send({status:false, message:"email is already regesterd"})}

let checkPhone = await userModel.findOne({phone:phone})
if(checkPhone){return res.status(400).send({status:false, message:"phone is already regesterd"})}

let saveData = await userModel.create(data)

return res.status(201).send({  status:true, message:'Success', data:saveData})
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------loginUser----------------------------------------------//

const loginUser = async function(req, res){
try { 
    let data = req.body
    let {email , password} = data

if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the login Credentials"})}
if(!isValid(email) ||!validateEmail(email)) {return res.status(400).send({status:false,message:"please enter email correctly"}) }
if(!isValid(password) || ! passwordValidate(password)) {return res.status(400).send({status:false,message:"please enter password correctly"}) }

let checkCredentials = await userModel.findOne({email:email,password:password})
if(!checkCredentials){ return res.status(401).send({status:false,message:"please enter valid email or password"})}

userId = checkCredentials._id
let token = jwt.sign(
    {
        userId: userId.toString(),
        batch: "radon",
        organisation: "project-3",
    },
    "ourThirdProject" , {
        expiresIn:'3600s'
    }
);
res.status(201).setHeader("x-api-key", token);
res.status(201).send({ status: true, token: token });
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

module.exports.createUser = createUser
module.exports.loginUser = loginUser