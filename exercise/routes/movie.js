const express = require('express');
const router = express.Router();
const db = require('../database');
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

//collection
const movieCollect = db.get('movies');
const transCollect = db.get('trans');
const conditionActive = { expried_date: { $gte: new Date() } , start_date: { $lte: new Date() }, status: { $eq: 1 } };

router.get('/time', (req, res) => {
    movieCollect.find(conditionActive)
        .then(movieList => {
            res.json(movieList);
        });
})

router.get('/sortPrice/:sort*?', (req, res) => {
    let sort = {}
    if(typeof req.params.sort != "undefined"){
        let isSort ;
        if(req.params.sort == "ce"){
            isSort = 1
        }else{
            isSort = -1
        }
        sort = {sort: {price: isSort}}
    }
    movieCollect.find(conditionActive, sort)
        .then(movieList => {
            res.json(movieList);
    });
})

router.get('/sortName/:sort*?', (req, res) => {
    let sort = {}
    if(typeof req.params.sort != "undefined"){
        let isSort ;
        if(req.params.sort == "az"){
            isSort = 1
        }else{
            isSort = -1
        }
        sort = {sort: {name: isSort}}
    }
    movieCollect.find(conditionActive, sort)
        .then(movieList => {
            res.json(movieList);
    });
})

router.get('/search/:name', (req, res) => {
    let name = req.params.name;
    movieCollect.find(
        { name: new RegExp(name, 'i') ,expried_date: { $gte: new Date() } , start_date: { $lte: new Date() },status: { $eq: 1 } })
        .then(movieList => {
            res.json(movieList);
        });
});

const schemaAdd = Joi.object().keys({
    name: Joi.string().min(1).max(100).required(),
    des: Joi.string().min(1).max(500).required(),
    price: Joi.string().min(1).max(500).required(),
    startDate: Joi.required(),
    expireDate: Joi.required()
});
router.post('/add', upload.single('productImage'), (req, res, next)=>{
    const result = Joi.validate(req.body, schemaAdd);
    if (result.error === null) {
        let filename = req.file.filename;
        const dataInsert = {
            name:           req.body.name,
            description:    req.body.des,
            price:          parseInt(req.body.price),
            pic_path:       filename,
            start_date:     new Date(req.body.startDate),
            expried_date:   new Date(req.body.expireDate),
            status:         1
        }
        movieCollect.insert(dataInsert).then(insertedMessage => {
            res.status(201).json({success: insertedMessage._id});
        });
    }else {
        res.json({error: "Validation Error"})
    }

});

router.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    movieCollect.find(
        { _id: id })
        .then(movieList => {
            res.json(movieList);
        });
});

const schemaTran = Joi.object().keys({
    movie_name: Joi.string().min(1).max(100).required(),
    movie_id: Joi.string().min(1).max(500).required(),
    priceInput: Joi.required(),
    totalPrice: Joi.required(),
    ticketTotal: Joi.required(),
    redirectHome: Joi.optional(),
    showRefund: Joi.optional(),
    pic_path:   Joi.optional()
});

router.post('/transections', (req, res)=>{
    // console.log( typeof req.body);
    const result = Joi.validate(req.body, schemaTran);
    if (result.error === null) {
        let data = {
            movie_name:     req.body.movie_name,
            movie_id:       req.body.movie_id,
            priceInput:     req.body.priceInput,
            totalPrice:     req.body.totalPrice,
            ticketTotal:    req.body.ticketTotal,
            date_time:      new Date
        };
        transCollect.insert(data).then(insertedMessage => {
            res.status(201).json({success: insertedMessage._id});
        });
    }else{
        res.json({error: result.error})
    }
});

const schemaDel = Joi.object().keys({
    id: Joi.string().min(1).max(100).required()
});
router.post('/delete', (req, res)=>{

    const result = Joi.validate(req.body, schemaDel);
    if (result.error === null) {
        movieCollect.update({_id: req.body.id}, { $set: { status : 0  } }, false, true ).then(success => {
            res.json(success);
        });
    }else{
        res.json({error: "Validation Error"})
    }
});

module.exports = router;

