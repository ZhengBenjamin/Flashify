const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const FlashdeckModel = require("../models/FlashdeckModel");
const FlashcardModel = require("../models/FlashcardModel");

dotenv.config(); 

const router = express.Router();

// POST /decks - Create a new deck
router.post("/createDeck", async (req, res) => {
    const { deck_id, username, title, description, card_count, cards } = req.body;
    if (!deck_id || !username) {
        return res.status(400).json({ message: "Missing field" });
    }

    try {
        const existingDeck = await FlashdeckModel.findOne({ deck_id });

        if (existingDeck) return res.status(400).json({ message: "deck_id already exists" });

        const newDeck = new FlashdeckModel({ deck_id, username, title, description, card_count, cards });

        await newDeck.save();
        res.status(201).json({ message: "Deck created successfully" });
    } catch (error) {
        console.error("Card Creation Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// GET /decks/:id - Retrieve a specific deck
router.post("/getDeck", async (req, res) => {
    const { deck_id } = req.body;

    try {
        const deck = await FlashdeckModel.findOne({ deck_id });
        if (!deck) return res.status(400).json({ message: "Invalid deck_id" });

        res.json({ deck: { deck_id: deck.deck_id, username: deck.username, title: deck.title, description: deck.description, card_count: deck.card_count, cards: deck.cards } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




// PUT /decks/:id - Update deck details
// DELETE /decks/:id - Remove a deck


// POST /decks/:id/flashcards - Add a flashcard to a deck


// GET /decks/:id/flashcards - Retrieve flashcards from a deck

module.exports = router;