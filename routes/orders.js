const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../auth/check-auth');
const router = express.Router();

const controllerOrders = require('../controllers/orders');

router.get('/', checkAuth, controllerOrders.orders_get_all);

router.post('/', checkAuth, controllerOrders.create_order);

router.get('/:orderId', checkAuth, controllerOrders.get_order);

router.delete('/:orderId', checkAuth, controllerOrders.delete_order);

module.exports = router;
