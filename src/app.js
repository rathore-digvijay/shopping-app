const express = require('express');
const routes = require('./routes/index.js');
const mongoConn = require('../database/mongoConnection.js');

const app = express();
const port = process.env.PORT || 3000;



console.log("berfore")
mongoConn.init(function (status) {
    app.use('/', routes);
    app.listen(port, () => {
        console.log('Server is up on port ' + port);
    })
});
console.log("after")


// Server start
