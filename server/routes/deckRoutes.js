const express = require("express");
const mongoose = require("mongoose");
const FlashdeckModel = require("../models/FlashdeckModel");

const router = express.Router();

// ✅ Create a flashdeck
router.post("/", async (req, res) => {
  const { username, title, subject_id } = req.body;
  try {
    // Step 1: Create the flashdeck
    const newDeck = new FlashdeckModel({
      deck_id: new mongoose.Types.ObjectId().toString(),
      username,
      subject_id, 
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

// Get all flashdecks for a user
router.get("/", async (req, res) => {
  const { username, subject_id } = req.query;
  try {
    const filter = { username };
    if (subject_id) filter.subject_id = subject_id;

    const flashdecks = await FlashdeckModel.find(filter).populate("cards");
    res.json(flashdecks);
  } catch (error) {
    console.error("Error retrieving flashdecks:", error);
    res.status(500).json({ error: "Error retrieving flashdecks" });
  }
});

// ✅ Update a flashdeck
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required to update the flashdeck" });
  }

  try {
    const updatedDeck = await FlashdeckModel.findByIdAndUpdate(
      id,
      { $set: { title } },
      { new: true }
    );

    if (!updatedDeck) {
      return res.status(404).json({ message: "Flashdeck not found" });
    }

    res.json({ message: "Flashdeck updated successfully", deck: updatedDeck });
  } catch (error) {
    console.error("Error updating flashdeck:", error);
    res.status(500).json({ error: "Error updating flashdeck" });
  }
});

// ✅ Delete a flashdeck
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDeck = await FlashdeckModel.findByIdAndDelete(id);
    if (!deletedDeck) {
      return res.status(404).json({ message: "Flashdeck not found" });
    }

    res.json({ message: "Flashdeck deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashdeck:", error);
    res.status(500).json({ error: "Error deleting flashdeck" });
  }
});

module.exports = router;
