const express = require("express");
const FlashdeckModel = require("../models/FlashdeckModel");
const FlashcardModel = require("../models/FlashcardModel");

const router = express.Router();

/**
 * @route POST /decks
 * @desc Create a new deck
 */
router.post("/decks", async (req, res) => {
    const { username, title, description } = req.body;

    if (!username || !title) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newDeck = new FlashdeckModel({ username, title, description, card_count: 0, cards: [] });
        await newDeck.save();
        res.status(201).json({ message: "Deck created successfully", deck: newDeck });
    } catch (error) {
        console.error("Deck Creation Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route GET /decks/:id
 * @desc Retrieve a specific deck by ID
 */
router.get("/decks/:id", async (req, res) => {
    try {
        const deck = await FlashdeckModel.findById(req.params.id);
        if (!deck) return res.status(404).json({ message: "Deck not found" });

        res.json(deck);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route PUT /decks/:id
 * @desc Update deck details
 */
router.put("/decks/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedDeck = await FlashdeckModel.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!updatedDeck) return res.status(404).json({ message: "Deck not found" });

        res.json({ message: "Deck updated successfully", deck: updatedDeck });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route DELETE /decks/:id
 * @desc Remove a deck by ID
 */
router.delete("/decks/:id", async (req, res) => {
    try {
        const deletedDeck = await FlashdeckModel.findByIdAndDelete(req.params.id);
        if (!deletedDeck) return res.status(404).json({ message: "Deck not found" });

        res.json({ message: "Deck deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route POST /decks/:id/flashcards
 * @desc Add a flashcard to a deck
 */
router.post("/decks/:id/flashcards", async (req, res) => {
    try {
        const { username, front, back, description } = req.body;

        if (!username || !front || !back) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const deck = await FlashdeckModel.findById(req.params.id);
        if (!deck) return res.status(404).json({ message: "Deck not found" });

        const newFlashcard = new FlashcardModel({ deck_id: req.params.id, username, front, back, description });
        await newFlashcard.save();

        deck.cards.push(newFlashcard._id);
        deck.card_count += 1;
        await deck.save();

        res.status(201).json({ message: "Flashcard added successfully", flashcard: newFlashcard });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route GET /decks/:id/flashcards
 * @desc Retrieve flashcards from a specific deck
 */
router.get("/decks/:id/flashcards", async (req, res) => {
    try {
        const flashcards = await FlashcardModel.find({ deck_id: req.params.id });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
