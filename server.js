require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT;
const server = http.createServer(app);

if (port === undefined){
    console.log('The port is undefined, have you created your .env file from .env_sample?');
} else {
    console.log("App has started...Listening on port " + port);
    server.listen(port);
}
