const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    availability: { type: Boolean, required: true },
    pricePerLiter: { type: Number, required: true },
    image: { type: String, required: true }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
