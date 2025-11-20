const express = require("express");
const router = express.Router();
const FoodEntry = require("../models/FoodEntry");

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Food API works" });
});

// Save a food entry
router.post("/add", async (req, res) => {
    try {
        const { name, calories, quantity, person } = req.body;

        if (!person) {
            return res.status(400).json({ error: "Person name is required" });
        }

        const newEntry = new FoodEntry({ name, calories, quantity, person });
        await newEntry.save();

        res.json({ message: "Food entry saved!", entry: newEntry });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error saving entry" });
    }
});

module.exports = router;
