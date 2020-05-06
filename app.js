const express = require('express');
const routes = require('./src/routes/index.js');
const mongoConn = require('./src/database/mongoConnection.js');
const path = require('path');

const publicDirectoryPath = path.join(__dirname, '/public')

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', routes);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Set Application Static Layout
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});

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


