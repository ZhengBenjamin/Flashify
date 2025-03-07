const express = require("express");
const mongoose = require("mongoose");
const FlashdeckModel = require("../models/FlashdeckModel");

const router = express.Router();

// ✅ Get all flashdecks for a user
router.get("/", async (req, res) => {
    const { username } = req.query;
    try {
        const flashdecks = await FlashdeckModel.find({ username }).populate("cards");
        res.json(flashdecks);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving flashdecks" });
    }
});

// ✅ Create a flashdeck
router.post("/", async (req, res) => {
    const { username, title, description } = req.body;
    try {
        const newDeck = new FlashdeckModel({
            deck_id: new mongoose.Types.ObjectId().toString(),
            username,
            title,
            description,
            card_count: 0,
            cards: []
        });

        await newDeck.save();
        res.status(201).json({ message: "Flashdeck created successfully", deck: newDeck });
    } catch (error) {
        res.status(500).json({ error: "Error creating flashdeck" });
    }
});

// ✅ Delete a flashdeck (also deletes all flashcards inside it)
router.delete("/:deck_id", async (req, res) => {
    const { deck_id } = req.params;
    try {
        const deletedDeck = await FlashdeckModel.findOneAndDelete({ deck_id });

        if (!deletedDeck) return res.status(404).json({ error: "Flashdeck not found" });

        // Delete all flashcards in this deck
        await FlashcardModel.deleteMany({ deck_id });

        res.json({ message: "Flashdeck and associated flashcards deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting flashdeck" });
    }
});

module.exports = router;
