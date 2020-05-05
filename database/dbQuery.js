const mongo = require('./mongoConnection.js');

const model = {};

model.findUser = function findUser(query, cb) {
    mongo.dbInst.collection('users').findOne(query, function(err, result){
        cb(err, result);
    })
}

module.exports = model;