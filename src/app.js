/*
 * File: app.js
 * Project: ecommerce-app
 * File Created: Monday, 4th May 2020 8:41:05 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const express = require('express');
const routes = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 3000;


app.use('/', routes);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
