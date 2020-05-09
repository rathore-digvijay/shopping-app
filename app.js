const express = require('express');
const path = require('path');
const routes = require('./src/routes/index.js');
const mongoConn = require('./src/database/mongoConnection.js');

const publicDirectoryPath = path.join(__dirname, '/public');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', routes);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Set Application Static Layout
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`)); // Set index.html as layout
});

// Mongo connection establishment
mongoConn.init((status) => {
    if (!status) {
        // mongo connection failed
        process.exit();
    }
});

// Server start
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
