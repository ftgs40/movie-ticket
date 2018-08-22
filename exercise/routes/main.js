const express = require('express');
const router = express.Router();
const db = require('../database');
const {siteUrl} = require('../config')
const movieCollect = db.get('movies');

router.get('/', (req, res) =>{
    // res.send('Hello World!')
    movieCollect
    .find()
    .then(movieList => {
      res.json(movieList);
    });
    
})

router.get('/insert/:sort', (req, res) =>{
    // res.send('Hello World!')
    // movieCollect.insert({ moview: 'Aventure' }).then(insertedMessage => {
    //     res.json(insertedMessage);
    // });
    // res.json({dd:req.params.sort});
    console.log(__dirname + '/uploads/'+req.params.sort)
    res.sendFile( __dirname + '/uploads/'+req.params.sort)
})

router.get('/img/:path', (req, res) =>{
    //     let path = req.params.path;
    //     // res.sendFile(__dirname + '/uploads/'+path)
        res.json({dd:'dd'});
})


 
module.exports = router;

