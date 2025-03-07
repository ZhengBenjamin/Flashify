const express = require("express");
const mongoose = require("mongoose");
const FlashdeckModel = require("../models/FlashdeckModel");

const router = express.Router();

// ✅ Create a flashdeck
router.post("/", async (req, res) => {
  const { username, title } = req.body; // Remove description here
  try {
    // Step 1: Create the flashdeck
    const newDeck = new FlashdeckModel({
      deck_id: new mongoose.Types.ObjectId().toString(),
      username,
      title,
      card_count: 0, // Initial card count is zero
      cards: [] // We'll add the flashcards later
    });

    // Step 2: Save the flashdeck
    await newDeck.save();

    // Send response with the saved deck data
    res.status(201).json({ message: "Flashdeck created successfully", deck: newDeck });
  } catch (error) {
    console.error("Error creating flashdeck:", error);
    res.status(500).json({ error: "Error creating flashdeck" });
  }
});

// ✅ Get all flashdecks for a user
router.get("/", async (req, res) => {
  const { username } = req.query; // Get the username from the query string
  try {
    const flashdecks = await FlashdeckModel.find({ username }).populate("cards"); // Fetch the flashdecks and populate the cards field
    res.json(flashdecks); // Send the flashdecks as a response
  } catch (error) {
    console.error("Error retrieving flashdecks:", error);
    res.status(500).json({ error: "Error retrieving flashdecks" });
  }
});

// GET flashcard decks for a specific user
router.get("/", async (req, res) => {
  const { username } = req.query;
  try {
    // Find decks associated with the provided username
    const decks = await FlashdeckModel.find({ username });
    res.status(200).json({ decks });
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Error fetching decks" });
  }
});


module.exports = router;
