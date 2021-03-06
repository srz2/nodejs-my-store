const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://' + process.env.IP_ADDRESS + ':' + process.env.PORT + '/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save()

        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order created!',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://' + process.env.IP_ADDRESS + ':' + process.env.PORT + '/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.get_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .populate('product', 'name')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://' + process.env.IP_ADDRESS + ':3000/orders'
                }
            });
        })
        .catch(err => {
            error: err
        });
}

exports.delete_order = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({
        _id: orderId
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Deleted',
                request: {
                    type: 'POST',
                    url: 'http://' + process.env.IP_ADDRESS + ':3000/orders',
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}
