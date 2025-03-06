const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const FlashcardModel = require("../models/FlashcardModel");

dotenv.config(); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 

// POST /flashcards - Create a new flashcard
// GET /flashcards/:id - Retrieve a specific flashcard
// PUT /flashcards/:id - Update flashcard details
// DELETE /flashcards/:id - Remove a flashcard

module.exports = router;