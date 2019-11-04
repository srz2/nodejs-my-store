const express = require('express');
const log = require('morgan');
const parser = require('body-parser');
const mongoose = require('mongoose');

const routeProduct = require('./routes/products');
const routeSteven  = require('./routes/steven');
const routeOrders  = require('./routes/orders');

mongoose.connect(
    'mongodb+srv://steven:myPass@cluster0-5398r.mongodb.net/test?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const app = express();

// Enable Logging
app.use(log('dev'));

// Make the uploads folder publicly available
app.use('/uploads', express.static('uploads'));

// Configure Body parser
app.use(parser.urlencoded({
    extended: false
}));
app.use(parser.json());

// CORS Error Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({

        });
    }
    next();
});

// Assign Routes
app.use('/products', routeProduct);
app.use('/steven', routeSteven);
app.use('/orders', routeOrders);

// Handle error where no page is handled via routing
app.use((req, res, next) => {
    const error = new Error('Not Found Anywhere :(');
    error.status =  404;
    next(error);
});

// Catch all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            note: 'Custom Error'
        }
    });
});

// Have app as export
module.exports = app;
