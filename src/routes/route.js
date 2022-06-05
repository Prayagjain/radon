const express = require('express');


const router = express.Router();

router.get('/Get/movies', function (req, res) {
    let movieList = ["spiderman", "batman", "ironman", "thor", "inception", "bohemian rapsody"]

    res.send(movieList)
});
router.get('/Get/movie/:indexNumber', function (req, res) {
  let movieList = ["spiderman", "batman", "ironman", "thor", "inception", "bohemian rapsody"]
  if(req.params.indexNumber >= 0 && req.params.indexNumber < movieList.length){
  res.send(movieList[req.params.indexNumber])
  }else{ res.send("No movie available")
}
});
router.get('/Get/films', function (req, res) {
let filmArr = [{
              "id": 1,
              "name": "dhoom"
            }, {
              "id": 2,
               "name": "krish"
            }, {
              "id": 3,
              "name": "3 idiots"
            }, {
              "id": 4,
              "name": "pk"
            }, {
              "id": 5,
              "name": "bahubali"
            }]
      res.send(filmArr)
})

router.get('/Get/films/:filmid', function (req, res) {
  let filmArr = [{
    "id": 1,
    "name": "dhoom"
  }, {
    "id": 2,
     "name": "krish"
  }, {
    "id": 3,
    "name": "3 idiots"
  }, {
    "id": 4,
    "name": "pk"
  }, {
    "id": 5,
    "name": "bahubali"
  }]
    if(req.params.filmid >= 1 && req.params.filmid <= filmArr.length){
      res.send(filmArr[req.params.filmid - 1].name) 
    }else {
      res.send("No such movie")
    }
  
})

module.exports = router;
// adding this comment for no reason