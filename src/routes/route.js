const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel.js")
const bookController= require("../controllers/bookController")

router.get("/bookCollection", function (req, res) {
    res.send("This is Book library")
})

router.post("/createBook", bookController.createBook)

router.post("/createAuther", bookController.createAuthor)

router.get("/bookList", bookController.bookList)

router.get("/getBooksInYear", bookController.getBooksInYear)

router.get("/getXINRBooks", bookController.getXINRBooks)

router.get("/books-by-authorid/:authorId", bookController.bookByAuthorId)

router.get("/findAuthor", bookController.findAuthor)


module.exports = router;