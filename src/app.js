const express = require('express');
const routes = require('./routes/index.js');
const mongoConn = require('../database/mongoConnection.js');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', routes);

// Mongo connection establishment 
mongoConn.init(function (status) {
    if(!status){
        // mongo connection failed
        process.exit();
    }
    // Server start
    app.listen(port, () => {
        console.log('Server is up on port ' + port);
    })
});


