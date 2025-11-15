const express = require("express");
const router = express.Router();
const FoodEntry = require("../models/FoodEntry");

// ✅ TEST ROUTE (IMPORTANT for checking backend is working)
router.get("/test", (req, res) => {
    res.json({ message: "Food API works" });
});

// ✅ Save a food entry
router.post("/add", async (req, res) => {
    try {
        const { name, calories, quantity } = req.body;

        const newEntry = new FoodEntry({
            name,
            calories,
            quantity,
        });

        await newEntry.save();
        res.json({ message: "Food entry saved!", entry: newEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error saving entry" });
    }
});

// ✅ Get today's entries
router.get("/today", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const entries = await FoodEntry.find({
            date: { $gte: today },
        });

        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching entries" });
    }
});

module.exports = router;
