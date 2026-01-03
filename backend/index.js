require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json()); // JSON data padhne ke liye
app.use(cors()); // Frontend connection allow karne ke liye

// MongoDB Connection
// "test" ki jagah apne database ka naam likh sakte ho
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecoTrackDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- USER MODEL (Schema) ---
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// 1. REGISTER Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check agar user pehle se hai
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Password Hash karna (Security ke liye)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya user create karna
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // MongoDB mein save karna
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// 2. LOGIN Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundo
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Token generate karo
    const token = jwt.sign({ id: user._id }, "SECRET_KEY_HERE", { expiresIn: "1h" });

    res.status(200).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));