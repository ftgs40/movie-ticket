const express = require('express');
const router = express.Router();
const db = require('../database');
const {siteUrl} = require('../config')
const movieCollect = db.get('movies');

router.get('/', (req, res) =>{
    movieCollect
    .find()
    .then(movieList => {
      res.json(movieList);
    });
    
})

router.get('/insert/:sort', (req, res) =>{
    console.log(__dirname + '/uploads/'+req.params.sort)
    res.sendFile( __dirname + '/uploads/'+req.params.sort)
})

router.get('/img/:path', (req, res) =>{
        res.json({dd:'dd'});
})


 
module.exports = router;

