const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{let data = req.body;
  let savedData = await userModel.create(data);
  console.log(req.newAtribute);
  res.status(201).send({ msg: savedData });
}catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
};

const loginUser = async function (req, res) {
 try {let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({
      status: false,
      msg: "username or the password is not corerct",
    });
console.log(user)
  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.status(201).setHeader("x-auth-token", token);
  res.status(201).send({ status: true, token: token });
} catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
};

const getUserData = async function (req, res) {
 try {let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(400).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
};

const updateUser = async function (req, res) {
 try {let userId = req.params.userId;
   let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(200).send({ status: updatedUser, data: updatedUser });
}catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
};

const deleteUser = async function (req, res) {
 try {let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{$set:{isDeleted:true}},{new:true});
  res.status(200).send({ msg: updatedUser });
}catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser