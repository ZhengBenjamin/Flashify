const express = require("express");
const mongoose = require("mongoose");
const FlashdeckModel = require("../models/FlashdeckModel");
const FlashcardModel = require("../models/FlashcardModel");

const router = express.Router();

// Create a flashcard and associate it with a deck
router.post("/", async (req, res) => {
  const { username, deck_id, front, back } = req.body;

  if (!front || !back || !deck_id) {
    return res.status(400).json({ message: "Front, back, and deck_id are required" });
  }

  try {
    // Step 1: Create the flashcard
    const newCard = new FlashcardModel({
      flashcard_id: new mongoose.Types.ObjectId().toString(),
      username,
      deck_id,
      front,
      back,
    });

    // Step 2: Save the flashcard
    await newCard.save();

    // Step 3: Update the deck with the new flashcard
    await FlashdeckModel.findOneAndUpdate(
      { deck_id },
      { $inc: { card_count: 1 }, $push: { cards: newCard._id } }
    );

    res.status(201).json({ message: "Flashcard created successfully", card: newCard });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    res.status(500).json({ error: "Error creating flashcard" });
  }
});

// Get all flashcards for a deck
router.get("/", async (req, res) => {
  const { username, deck_id } = req.query; // Get the username and deck_id from the query string
  try {
    const flashcards = await FlashcardModel.find({ username, deck_id });
    res.json(flashcards); // Send the flashcards as a response
  } catch (error) {
    console.error("Error retrieving flashcards:", error);
    res.status(500).json({ error: "Error retrieving flashcards" });
  }
});

// Update a flashcard
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;

  if (!front && !back) {
    return res.status(400).json({ message: "At least one field (front or back) must be provided" });
  }

  try {
    const updatedCard = await FlashcardModel.findByIdAndUpdate(
      id,
      { $set: { front, back } },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.json({ message: "Flashcard updated successfully", card: updatedCard });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Error updating flashcard" });
  }
});

// Delete a flashcard
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCard = await FlashcardModel.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    await FlashdeckModel.findOneAndUpdate(
      { deck_id: deletedCard.deck_id },
      //{ $inc: { card_count: -1 }, $pull: { cards: deletedCard._id } }
    );

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Error deleting flashcard" });
  }
});

module.exports = router;
