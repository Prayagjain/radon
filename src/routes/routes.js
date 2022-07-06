/*------------------------------------------Import Modules:-------------------------------------------*/
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')
const reviewController = require('../controllers/reviewController')

/*------------------------------------------API's:-------------------------------------------*/
router.post('/register',userController.createUser)
router.post('/books',booksController.createBook)   
router.post('/books/:bookId/review', reviewController.createReview)         



/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = router