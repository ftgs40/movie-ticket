const express = require('express');
const router = express.Router();
const db = require('../database');
const movieCollect = db.get('movies');

router.get('/time', (req, res) => {
    // res.send('movie List')
    movieCollect.find()
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/date/:sort*?', (req, res) => {

    let sort = {}
    if(typeof req.params.sort != "undefined"){
        sort = {sort: {name: parseInt(req.params.sort)}}
    }
    movieCollect.find({}, sort)
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/price', (req, res) => {
    res.send('movie List')
})

router.get('/search/:name', (req, res) => {
    res.send('movie List')
})

module.exports = router;

