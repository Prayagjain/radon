const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

router.get("/bookCollection", function (req, res) {
    res.send("This is Book library")
})

router.post("/createBook", UserController.createUser  )

router.get("/getBookData", UserController.getUsersData)

module.exports = router;