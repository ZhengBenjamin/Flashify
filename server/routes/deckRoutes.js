const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const FlashdeckModel = require("../models/FlashdeckModel");
const FlashcardModel = require("../models/FlashcardModel");

dotenv.config(); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 

// POST /decks - Create a new deck
// GET /decks/:id - Retrieve a specific deck
// PUT /decks/:id - Update deck details
// DELETE /decks/:id - Remove a deck


// POST /decks/:id/flashcards - Add a flashcard to a deck
// GET /decks/:id/flashcards - Retrieve flashcards from a deck

module.exports = router;