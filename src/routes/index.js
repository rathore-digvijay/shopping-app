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