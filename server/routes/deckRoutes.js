const express = require("express");
const mongoose = require("mongoose");
const FlashdeckModel = require("../models/FlashdeckModel");
const FlashcardModel = require("../models/FlashcardModel");

const router = express.Router();

// ✅ Create a flashdeck and its flashcards
router.post("/", async (req, res) => {
  const { username, title, flashcards } = req.body; // Remove description here
  
  try {
    // Step 1: Create the flashdeck
    const newDeck = new FlashdeckModel({
      deck_id: new mongoose.Types.ObjectId().toString(),
      username,
      title,
      card_count: flashcards.length,
      cards: [] // We'll add the flashcards to this later
    });

    // Step 2: Create flashcards and associate them with the new deck
    const createdFlashcards = [];
    for (let card of flashcards) {
      const newCard = new FlashcardModel({
        flashcard_id: new mongoose.Types.ObjectId().toString(),
        username,
        deck_id: newDeck.deck_id, // Associate the flashcard with the deck
        front: card.front,
        back: card.back
      });
      
      await newCard.save(); // Save the card
      createdFlashcards.push(newCard._id); // Store the card ID to associate it with the deck
    }

    // Step 3: Update the deck with the newly created flashcards
    newDeck.cards = createdFlashcards;
    await newDeck.save(); // Save deck only once

    // Send response with the saved deck data
    res.status(201).json({ message: "Flashdeck and flashcards created successfully", deck: newDeck });
  } catch (error) {
    console.error("Error creating flashdeck and flashcards:", error);
    res.status(500).json({ error: "Error creating flashdeck and flashcards" });
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

module.exports = router;
