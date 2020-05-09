const { MongoClient } = require('mongodb');
const dbConfig = require('./dbConfig.json');

// Connection URL
const localUrl = `mongodb://${dbConfig.host}:${dbConfig.port}`;
const { url } = process.env.MONGODB_URI || localUrl;
const options = { useUnifiedTopology: true };

exports.init = (cb) => {
    console.log('Mongo connection started', url);
    // Use connect method to connect to the server
    MongoClient.connect(url, options, (err, db) => {
        if (err) {
            console.log('here');
            return cb(false);
        }
        console.log('Connected successfully to server');
        exports.dbInst = db.db(dbConfig.dbName);
        cb(true);
    });
};
