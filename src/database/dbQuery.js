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

module.exports = model;
