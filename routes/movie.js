const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/',(req,res) => {
  const promise = Movie.aggregate([
    {
      $lookup : {
        from : 'directors',
        localField : 'director_id',
        foreignField :'_id',
        as : 'director'
      }
    },
    {
      $unwind : '$director'
    }
  ]);
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})


router.get('/top10',(req,res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score :-1});
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.get('/between/:start_year/:end_year',(req,res) => {
  const {start_year,end_year} = req.params;
  const promise = Movie.find({
    year : {"$gte": parseInt(start_year), "$lte" : parseInt(end_year)}
  });

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.get('/:movie_id',(req,res,next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((data) => {
    if(!data){
        next({message : 'film yok'})
    }
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.put('/:movie_id',(req,res,next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body);
  promise.then((data) => {
    if(!data){
        next({message : 'film yok'})
    }
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

router.delete('/:movie_id',(req,res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((data) => {
    if(!data){
        next({message : 'film yok'})
    }
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})




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
