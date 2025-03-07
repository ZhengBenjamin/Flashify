const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
const FlashcardModel = require("../models/FlashcardModel");

dotenv.config(); 

const router = express.Router();

// POST /flashcards - Create a new flashcard
router.post("/createCard", async (req, res) => {
    const { flashcard_id, deck_id, username, description, front, back } = req.body;
    if (!flashcard_id || !deck_id || !username) {
        return res.status(400).json({ message: "Missing field" });
    }

    try {
        const existingCard = await FlashcardModel.findOne({ flashcard_id });

        if (existingCard) return res.status(400).json({ message: "flashcard_id already exists" });

        const newCard = new FlashcardModel({ flashcard_id, deck_id, username, description, front, back });

        await newCard.save();
        res.status(201).json({ message: "Card created successfully" });
    } catch (error) {
        console.error("Card Creation Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// GET /flashcards/:id - Retrieve a specific flashcard
router.post("/getCard", async (req, res) => {
    const { flashcard_id } = req.body;

    try {
        const card = await FlashcardModel.findOne({ flashcard_id });
        if (!card) return res.status(400).json({ message: "Invalid flashcard_id" });

        res.json({ card: { id: card.flashcard_id, deck_id: card.deck_id, username: card.username, description: card.description, front: card.front, back: card.back } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route PUT /flashcards/:id
 * @desc Update flashcard details
 */
router.put("/flashcards/:id", async (req, res) => {
    try {
        const { front, back, description } = req.body;
        const updatedCard = await FlashcardModel.findByIdAndUpdate(
            req.params.id,
            { front, back, description },
            { new: true }
        );

        if (!updatedCard) return res.status(404).json({ message: "Flashcard not found" });

        res.json({ message: "Flashcard updated successfully", card: updatedCard });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route DELETE /flashcards/:id
 * @desc Delete a flashcard by ID
 */
router.delete("/flashcards/:id", async (req, res) => {
    try {
        const deletedCard = await FlashcardModel.findByIdAndDelete(req.params.id);
        if (!deletedCard) return res.status(404).json({ message: "Flashcard not found" });

        res.json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;