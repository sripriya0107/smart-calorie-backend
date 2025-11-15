const express = require('express');
const router = express.Router();
const CalorieEntry = require('../models/CalorieEntry');
const User = require('../models/User');

// Inbuilt food calorie dictionary
const calorieData = {
    apple: 95, banana: 89, rice: 130, bread: 75, egg: 78, milk: 42, pizza: 266
};

// Add food entry
router.post('/add', async (req, res) => {
    try {
        const { userId, foodName } = req.body;
        const calories = calorieData[foodName.toLowerCase()] || 0;

        const entry = new CalorieEntry({ userId, foodName, calories });
        await entry.save();

        res.json({ message: 'Entry added successfully', entry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get total consumed calories for user
router.get('/:userId', async (req, res) => {
    try {
        const entries = await CalorieEntry.find({ userId: req.params.userId });
        const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

        const user = await User.findById(req.params.userId);
        const remaining = user.dailyCalorieLimit - totalCalories;

        res.json({ entries, totalCalories, remaining, limit: user.dailyCalorieLimit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
