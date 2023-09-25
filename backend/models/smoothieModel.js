const mongoose = require('mongoose');

const smoothieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    availability: { type: Boolean, required: true },
    price: { type: Number, required: true },
    ingredients: { type: Array, required: true },
    image: { type: String, required: true }
});

const Smoothie = mongoose.model('Smoothie', smoothieSchema);

module.exports = Smoothie;
