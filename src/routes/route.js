const express = require('express');

const router = express.Router();

router.get('/miss-num', function (req, res) {
    
    let arr= [1,2,3,5,6,7]
 
    let total = 0;
    for (var i in arr) {
        total += arr[i]; // --> total = total + arr[i]
    }
  
    let lastDigit= arr.pop()
    let consecutiveSum= lastDigit * (lastDigit+1) / 2
    let missingNumber= consecutiveSum - total
  
    res.send(  { data: missingNumber  }  );

    
 });

 router.get('/miss-num2', function (req, res){
    
    let arr2 = [33, 34, 35, 37, 38]
    let len2 = arr2.length
  
    let total2 = 0;
    for (var i in arr2) {
        total2 += arr2[i]; // --> total2 = total2 + arr2[i]
    }
  
    let firstDigit2= arr2[0]
    let lastDigit2= arr2.pop()
    let consecutiveSum2= (len2 + 1) * (firstDigit2 + lastDigit2 ) / 2
    let missingNumber2= consecutiveSum2 - total2
   
    res.send(  { data: missingNumber2  }  );

 });

module.exports = router;
// adding this comment for no reason