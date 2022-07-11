/*------------------------------------------Import Modules:-------------------------------------------*/
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')
const reviewController = require('../controllers/reviewController')
const middleware = require('../middleware/commonMiddleware')

/*------------------------------------------API's for userController-------------------------------------------*/
router.post('/register',userController.createUser)
router.post('/login', userController.loginUser)

//------------------------------------------Api's for bookController----------------------------------------------//

router.post('/books',middleware.authentication, middleware.authorisation, booksController.createBook)   
router.get('/books' , booksController.getBooks)
router.get('/books/:bookId' , booksController.getBookByParams)
router.put('/books/:bookId' ,middleware.authentication, middleware.authorisation2, booksController.updateBooks)
router.delete('/books/:bookId',middleware.authentication,  middleware.authorisation2, booksController.deleteByParams)

//-------------------------------------------Api's for reviewController----------------------------------------------//

router.post('/books/:bookId/review', reviewController.createReview)  
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId' , reviewController.deleteReview)

/*------------------------------------------Export Modules:-------------------------------------------*/
module.exports = router