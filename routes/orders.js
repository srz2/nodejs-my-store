const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.orderId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;    
    res.status(200).json({
        message: 'Orders details',
        orderID: orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: 'Orders Deleted',
        orderID: orderId
    });
});

module.exports = router;
