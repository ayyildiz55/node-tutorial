const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

/* GET users listing. */
router.post('/', function(req, res, next) {
  const {title,imdb_score,country,date,year,category} = req.body;
  
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) =>{
    res.json({status : 1})
  }).catch((err) => {
    res.json(err)
  })

});

module.exports = router;
