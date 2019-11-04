require('dotenv').config();
const fs = require('fs');
const http = require('http');
const app = require('./app');

const port = process.env.PORT;
const server = http.createServer(app);

if (!fs.existsSync('.env')) {
    console.log('[Error]: The .env file is not found. Please use the \'.env_sample\' file to create it and fill in the required information.');
    process.exit();
}

if (port === undefined){
    console.log('The port is undefined, have you created and configured your .env file from .env_sample?');
} else {
    console.log("App has started...Listening on port " + port);
    server.listen(port);
}
