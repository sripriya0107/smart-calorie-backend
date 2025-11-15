const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    height: Number,  // in cm
    weight: Number,  // in kg
    dailyCalorieLimit: Number
});

module.exports = mongoose.model('User', userSchema);
