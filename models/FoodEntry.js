const mongoose = require("mongoose");

const FoodEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    person: { type: String, required: true } // ✅ NEW FIELD
});

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);
