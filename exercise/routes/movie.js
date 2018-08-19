const express = require('express');
const router = express.Router();
const db = require('../database');
const movieCollect = db.get('movies');
const Joi = require('joi');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().getTime() + file.originalname);
    }
  });
const upload = multer({storage: storage})

const schema = Joi.object().keys({
    name: Joi.string().min(1).max(100).required(),
    des: Joi.string().min(1).max(500).required()
});

router.get('/time', (req, res) => {
    // res.send('movie List')
    movieCollect.find({status: 1})
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/date/:sort*?', (req, res) => {
    let sort = {}
    if(typeof req.params.sort != "undefined"){
        sort = {sort: {start_date: parseInt(req.params.sort)}}
    }
    movieCollect.find({}, sort)
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/price/:sort*?', (req, res) => {
    let sort = {}
    if(typeof req.params.sort != "undefined"){
        sort = {sort: {price: parseInt(req.params.sort)}}
    }
    movieCollect.find({}, sort)
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/search/:name', (req, res) => {
    let name = req.params.name;
    movieCollect.find(
        { name: new RegExp(".*"+name+"*.", 'i') })
        .then(movieList => {
            res.json(movieList);
        });
});

router.get('/checkExpired',(req, res) => {

});

router.post('/add', (req, res)=>{
    // return res.json(insertToMovie({ moview: 'Aventure' }))
    // let data = { moview: 'Aventure' };
    // movieCollect.insert(data).then(insertedMessage => {
    //     res.json(insertedMessage);
    // });
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        movieCollect.insert(req.body).then(insertedMessage => {
                res.status(201).json({success: insertedMessage._id});
        });
    }else {
        res.json({error: "Validation Error"})
    }
});

router.post('/upload', upload.single('productImage'), (req, res, next)=>{
    let path = req.file.path;
    let filename = req.file.filename;
    console.log(req.file);
    res.json({ok: "OK"})
});

module.exports = router;

