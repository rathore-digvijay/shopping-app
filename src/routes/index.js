const express = require('express');

const router = express.Router();
const registrationService = require('./services/registrationService.js');

router.get('/', (req, res) => {
    res.json({
        title: 'Ecomm App',
        author: 'Digvijay Rathore',
    });
});


router.post('/registration', (req, res) => {
    registrationService.registerUser(req, res);
});

module.exports = router;
