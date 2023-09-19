const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothieModel');

// GET route to fetch all smoothies
router.get('/', async (req, res) => {
    try {
        const smoothies = await Smoothie.find();
        res.json(smoothies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to fetch a single smoothie by ID
router.get('/:id', async (req, res) => {
    try {
        const smoothie = await Smoothie.findById(req.params.id);
        if (smoothie) {
            res.json(smoothie);
        } else {
            res.status(404).json({ message: 'Smoothie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a new smoothie
router.post('/', async (req, res) => {
    const smoothie = new Smoothie({
        name: req.body.name,
        availability: req.body.availability,
        price: req.body.price,
        ingredients: req.body.ingredients,
    });

    try {
        const newSmoothie = await smoothie.save();
        res.status(201).json(newSmoothie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT route to update an existing smoothie
router.put('/:id', async (req, res) => {
    try {
        const updatedSmoothie = await Smoothie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (updatedSmoothie) {
            res.json(updatedSmoothie);
        } else {
            res.status(404).json({ message: 'Smoothie not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to delete a smoothie
router.delete('/:id', async (req, res) => {
    try {
        const deletedSmoothie = await Smoothie.findByIdAndDelete(req.params.id);
        if (deletedSmoothie) {
            res.json({ message: 'Smoothie deleted' });
        } else {
            res.status(404).json({ message: 'Smoothie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
