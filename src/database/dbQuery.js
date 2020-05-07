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

module.exports = model;
