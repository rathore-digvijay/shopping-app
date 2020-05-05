const mongo = require('./mongoConnection.js');
console.log("mongo ", mongo)

const model = {};

model.findUser = function findUser(query, cb) {
    console.log("mongo 33", mongo)
    mongo.instance.collection('users').findOne(query, function(err, result){
        cb(err, result);
    })
}

module.exports = model;