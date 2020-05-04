/*
 * File: index.js
 * Project: ecommerce-app
 * File Created: Monday, 4th May 2020 8:47:19 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.json({
        title: 'Ecomm App',
        author: 'Digvijay Rathore'
    })
});

module.exports = router;