const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Calculate BMR (Basal Metabolic Rate)
function calculateBMR({ gender, weight, height, age }) {
    if (gender === 'male')
        return 10 * weight + 6.25 * height - 5 * age + 5;
    else
        return 10 * weight + 6.25 * height - 5 * age - 161;
}

// Register User + Calculate dailyCalorieLimit
router.post('/register', async (req, res) => {
    try {
        const { name, age, gender, height, weight, activityLevel } = req.body;
        const bmr = calculateBMR({ gender, weight, height, age });
        const calorieLimit = Math.round(bmr * (activityLevel || 1.2)); // 1.2 default sedentary

        const user = new User({
            name, age, gender, height, weight,
            dailyCalorieLimit: calorieLimit
        });
        await user.save();

        res.json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
