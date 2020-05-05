/*
 * File: index.js
 * Project: ecommerce-app
 * File Created: Monday, 4th May 2020 8:47:19 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

var express = require('express');
var router = express.Router();
const dbQuery = require('../../database/dbQuery.js')


router.get('/', (req, res) => {
    dbQuery.findUser({}, function (err, result) {
        console.log("err", err)
        console.log("result", result)
        res.json({
            title: 'Ecomm App',
            author: 'Digvijay Rathore'
        })
    })
});

module.exports = router;