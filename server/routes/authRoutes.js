/**
 * Authentication route handlers.
 * 
 * Handles user registration, login (with JWT), fetching users, and deletion.
 * Uses bcrypt for password hashing and JWT for secure session tokens.
 * 
 * @module routes/authRoutes
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");

dotenv.config(); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 


/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await UserModel.findOne({ username }); //is this necessary? The schema should set it as unique already, no?
        const existingEmail = await UserModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Username already exists" });
        if (existingEmail) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


/**
 * @route POST /login
 * @desc Authenticate a user and get a JWT token
 * @access Public
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    
    res.json({ 
      token, 
      user: { id: user._id, username: user.username, role: user.role } 
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * @route GET /
 * @desc Get a list of all users (for admin use only)
 * @access Private (should be protected in future)
 */
router.get("/", async (req, res) => {
    try {
      const allUsers = await UserModel.find().select("_id username");
      res.json(allUsers);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Error retrieving users" });
    }
});
  
  

/**
 * @route DELETE /:id
 * @desc Delete a user by their ID
 * @access Private (should be protected in future)
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
