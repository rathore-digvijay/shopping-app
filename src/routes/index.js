const express = require('express');

const router = express.Router();
const registrationService = require('./services/registrationService.js');
const productService = require('./services/productService.js');
const productMgmt = require('./services/productMgmt.js');
const purchaseMgmt = require('./services/purchaseMgmt.js');

router.get('/', (req, res) => {
    res.json({
        title: 'Ecomm App',
        author: 'Digvijay Rathore',
    });
});


router.post('/registration', (req, res) => {
    registrationService.registerUser(req, res);
});

router.post('/login', (req, res) => {
    registrationService.loginPlayer(req, res);
});

router.post('/addProduct', (req, res) => {
    productService.insertProducts(req, res);
});

router.get('/listProducts', (req, res) => {
    productMgmt.listProducts(req, res);
});

router.post('/placeOrder', (req, res) => {
    purchaseMgmt.purchaseProduct(req, res);
});

router.post('/getPurchaseList', (req, res) => {
    console.log('hereee');
    purchaseMgmt.getPurchaseList(req, res);
});


module.exports = router;
