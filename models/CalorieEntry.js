const mongoose = require('mongoose');

const calorieEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    foodName: String,
    calories: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CalorieEntry', calorieEntrySchema);
