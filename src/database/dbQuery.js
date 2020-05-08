const mongo = require('./mongoConnection.js');

const model = {};

model.findUser = function findUser(query, cb) {
    mongo.dbInst.collection('users').findOne(query, (err, result) => {
        cb(err, result);
    });
};

model.createUser = function createUser(data, callback) {
    mongo.dbInst.collection('users').insertOne(data, (err, result) => {
        callback(err, result);
    });
};

model.countProduct = function countProduct(query, cb) {
    mongo.dbInst.collection('products').countDocuments(query, (err, result) => {
        cb(err, result);
    });
};

model.insertProductData = function insertProductData(data, callback) {
    mongo.dbInst.collection('products').insertOne(data, (err, result) => {
        callback(err, result);
    });
};

model.getAllProducts = function getAllProducts(query, cb) {
    mongo.dbInst.collection('products').find(query).toArray((err, result) => {
        cb(err, result);
    });
};

model.insertPurchaseData = function insertPurchaseData(data, callback) {
    mongo.dbInst.collection('purchaseList').insertOne(data, (err, result) => {
        callback(err, result);
    });
};

model.findPurchaseList = function findPurchaseList(query, cb) {
    mongo.dbInst.collection('purchaseList').find(query).toArray((err, result) => {
        cb(err, result);
    });
};

model.updateOrderStatus = function updateOrderStatus(query, updateData, cb) {
    console.log(query);
    console.log('query');
    console.log(updateData);
    console.log('query');
    mongo.dbInst.collection('purchaseList').updateOne(query, { $set: updateData }, (err, result) => {
        console.log(err);
        console.log('query');
        console.log(result);
        console.log('query');
        cb(err, result);
    });
};

module.exports = model;
