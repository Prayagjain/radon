const express = require('express');
const externalModule = require('.././logger/logger')
const externalModule2 = require('.././util/helper')
const externalModule3 = require('.././validator/formatter')
const lodash = require("lodash")

const router = express.Router();

router.get('/test-me', function (req, res) {
    externalModule.log()
    externalModule2.date()
    externalModule2.month()
    externalModule2.info()
    externalModule3.trim()
    externalModule3.lower()
    externalModule3.upper()

    res.send('My first ever api!')
});
router.get('/hello', function (req, res) {
  let arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   console.log(lodash.chunk(arr, 3))

  let arr1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  let x = lodash.tail(arr1)
      console.log(x)

 let arr2 = lodash.union([15, 7, 6], [9, 15, 6], [7, 9, 13], [16, 4, 63], [1, 63, 13]);
      console.log(arr2)

let arr3 = [["name", "prayag"], ["age",23], ["state","M.P"], ["Hobbie","Singing"]]
  let obj = lodash.fromPairs(arr3)
  console.log(obj)
  
  res.send('My api!')
});


module.exports = router;
// adding this comment for no reason