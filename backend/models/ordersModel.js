const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    deliveryType: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, reguired: false },
    price: { type: Number, required: true },
    smoothie: { type: Array, required: true }
});

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;