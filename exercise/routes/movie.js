const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('movie List')

})

module.exports = router;

