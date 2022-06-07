const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel.js")
const bookController= require("../controllers/bookController")

router.get("/bookCollection", function (req, res) {
    res.send("This is Book library")
})

router.post("/createBook", bookController.createBook)

router.get("/bookList", bookController.bookList)

router.post("/getBooksInYear", bookController.getBooksInYear)

router.post("/getParticularBooks", bookController.getParticularBooks)

router.get("/getXINRBooks", bookController.getXINRBooks)

router.get("/getRandomBooks", bookController.getRandomBooks)



module.exports = router;