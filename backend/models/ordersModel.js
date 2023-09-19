const mongoose = require('mongoose');

const ordersSchame = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    deliveryType: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, reguired: false },
    price: { type: Number, required: true },
    smoothie: { type: String, required: true }
});

const Order = mongoose.model('Order', ordersSchame);

module.exports = Order;