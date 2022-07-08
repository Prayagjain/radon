/*------------------------------------------Import Modules:-------------------------------------------*/
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')
const reviewController = require('../controllers/reviewController')
const middleware = require('../middleware/commonMiddleware')

/*------------------------------------------API's:-------------------------------------------*/
router.post('/register',userController.createUser)
router.post('/books',middleware.authentication, middleware.authorisation, booksController.createBook)   
router.post('/books/:bookId/review', reviewController.createReview)         
router.post('/login', userController.loginUser)
router.get('/books' , booksController.getbooks)
router.get('/books/:bookId' , booksController.getbookByparams)
router.put('/books/:bookId' ,middleware.authentication, middleware.authorisation2, booksController.updatebooks)
router.delete('/books/:bookId',middleware.authentication,  middleware.authorisation2, booksController.deleteByParams)



/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = router