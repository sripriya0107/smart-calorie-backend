const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const calorieRoutes = require('./routes/calorieRoutes');
const foodRoutes = require("./routes/foodRoutes");

const app = express();

// ⭐ FIXED CORS FOR NETLIFY + RENDER
app.use(cors({
    origin: "*", // Allow all frontends (Netlify)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/calories', calorieRoutes);
app.use("/api/food", foodRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
