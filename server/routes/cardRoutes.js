const express = require("express");
const mongoose = require("mongoose");
const FlashcardModel = require("../models/FlashcardModel");
const FlashdeckModel = require("../models/FlashdeckModel");

const router = express.Router();

// Get all flashcards for a deck
router.get("/", async (req, res) => {
  const { username, deck_id } = req.query;
  
  // Validate inputs
  if (!username || !deck_id) {
    return res.status(400).json({ message: "Username and deck_id are required" });
  }

  try {
    const flashcards = await FlashcardModel.find({ username, deck_id });
    if (!flashcards.length) {
      return res.status(404).json({ message: "No flashcards found for this deck" });
    }
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving flashcards" });
  }
});

// Create a flashcard
router.post("/", async (req, res) => {
  const { username, deck_id, front, back } = req.body;

  // Validate inputs
  if (!front || !back || !deck_id || !username) {
    return res.status(400).json({ message: "Front, back, deck_id, and username are required" });
  }

  try {
    // Create a new flashcard
    const newCard = new FlashcardModel({
      flashcard_id: new mongoose.Types.ObjectId().toString(),
      username,
      deck_id,
      front,
      back,
    });

    await newCard.save();

    // Update the deck with the new flashcard
    const deckUpdate = await FlashdeckModel.findOneAndUpdate(
      { deck_id },
      { $inc: { card_count: 1 }, $push: { cards: newCard._id } },
      { new: true } // Ensure we get the updated deck
    );

    if (!deckUpdate) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.status(201).json({ message: "Flashcard created successfully", card: newCard });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    res.status(500).json({ error: "Error creating flashcard" });
  }
});

// Delete a flashcard
router.delete("/:flashcard_id", async (req, res) => {
  const { flashcard_id } = req.params;

  // Validate input
  if (!flashcard_id) {
    return res.status(400).json({ message: "flashcard_id is required" });
  }

  try {
    const deletedCard = await FlashcardModel.findOneAndDelete({ flashcard_id });

    if (!deletedCard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    // Update deck card count after deletion
    await FlashdeckModel.findOneAndUpdate(
      { deck_id: deletedCard.deck_id, username: deletedCard.username },
      { $inc: { card_count: -1 }, $pull: { cards: deletedCard._id } }
    );

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Error deleting flashcard" });
  }
});

module.exports = router;
