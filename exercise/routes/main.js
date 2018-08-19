const express = require('express');
const router = express.Router();
const db = require('../database');

const movieCollect = db.get('movies');

router.get('/', (req, res) =>{
    // res.send('Hello World!')
    // movieCollect
    // .find()
    // .then(movieList => {
    //   res.json(movieList);
    // });
    
})

router.get('/insert', (req, res) =>{
    // res.send('Hello World!')
    // movieCollect.insert({ moview: 'Aventure' }).then(insertedMessage => {
    //     res.json(insertedMessage);
    // });
    
})


 
module.exports = router;

