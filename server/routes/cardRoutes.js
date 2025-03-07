const express = require("express");
const mongoose = require("mongoose");
const FlashcardModel = require("../models/FlashcardModel");
const FlashdeckModel = require("../models/FlashdeckModel");

const router = express.Router();

// ✅ Get all flashcards for a deck
router.get("/", async (req, res) => {
    const { username, deck_id } = req.query;
    try {
        const flashcards = await FlashcardModel.find({ username, deck_id });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving flashcards" });
    }
});

// ✅ Create a flashcard
router.post("/", async (req, res) => {
    const { username, deck_id, front, back } = req.body;
    try {
        const newCard = new FlashcardModel({
            flashcard_id: new mongoose.Types.ObjectId().toString(),
            username,
            deck_id,
            front,
            back
        });
        await newCard.save();

        // Update deck card count
        await FlashdeckModel.findOneAndUpdate(
            { deck_id, username },
            { $inc: { card_count: 1 }, $push: { cards: newCard._id } }
        );

        res.status(201).json({ message: "Flashcard created successfully", card: newCard });
    } catch (error) {
        res.status(500).json({ error: "Error creating flashcard" });
    }
});

// ✅ Delete a flashcard
router.delete("/:flashcard_id", async (req, res) => {
    const { flashcard_id } = req.params;
    try {
        const deletedCard = await FlashcardModel.findOneAndDelete({ flashcard_id });

        if (!deletedCard) return res.status(404).json({ error: "Flashcard not found" });

        // Update deck card count
        await FlashdeckModel.findOneAndUpdate(
            { deck_id: deletedCard.deck_id, username: deletedCard.username },
            { $inc: { card_count: -1 }, $pull: { cards: deletedCard._id } }
        );

        res.json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting flashcard" });
    }
});

module.exports = router;
