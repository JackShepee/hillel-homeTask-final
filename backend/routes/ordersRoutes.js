const express = require('express');
const router = express.Router();
const Order = require('../models/ordersModel');

// GET route to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a new order
router.post('/', async (req, res) => {
    const order = new Order({
        name: req.body.name,
        surname: req.body.surname,
        deliveryType: req.body.deliveryType,
        phone: req.body.phone,
        address: req.body.address,
        price: req.body.price,
        smoothie: req.body.smoothie,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
