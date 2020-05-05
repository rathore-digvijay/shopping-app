const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./dbConfig.json');

// Connection URL
const url = 'mongodb://' + dbConfig.host + ':' + dbConfig.port;
const options = { useUnifiedTopology: true };

exports.init = (cb) => {
    console.log('Mongo connection started', url);
    // Use connect method to connect to the server
    MongoClient.connect(url, options, function (err, db) {
        if(err){
            return cb(false);
        }
        console.log("Connected successfully to server");
        exports.dbInst = db.db(dbConfig.dbName);
        cb(true)
    });
}