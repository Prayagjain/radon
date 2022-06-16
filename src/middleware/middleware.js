const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const mid1=async function ( req, res, next) {
  let token = req.headers["x-Auth-token"];
  if (!token) {token = req.headers["x-auth-token"];}

  //If no token is present in the request header return error
  if (!token) {return res.ststus(401).send({ status: false, msg: "token must be present" });}
    console.log(token);
  
// If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
     try {let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(400).send("No such user exists");
    }
}catch(error){
    res.status(500).send({ msg: "Error", error: error.message })
}
  
try{let decodedToken = jwt.verify(token, "functionup-radon");
if (!decodedToken)
  {return res.status(401).send({ status: false, msg: "token is invalid" });}
  // authorization => Only allowed modification in logged user data
   let userToBeModified = req.params.userId
      let userLoggedIn = decodedToken.userId
      if(userToBeModified != userLoggedIn) return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
      next()
    }catch(error){
      res.status(500).send({ msg: "Error", error: error.message })
    } 
}
module.exports.mid1=mid1