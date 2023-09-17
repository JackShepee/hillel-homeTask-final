const express = require('express');
const router = express.Router();
const Smoothie = require('../models/Smoothie');

router.get('/', async (req, res) => {
    try {
        const smoothies = await Smoothie.find();
        res.json(smoothies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const smoothie = new Smoothie({
        name: req.body.name,
        availability: req.body.availability,
        pricePerLiter: req.body.pricePerLiter,
    });

    try {
        const newSmoothie = await smoothie.save();
        res.status(201).json(newSmoothie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
