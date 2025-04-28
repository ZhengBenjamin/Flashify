const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Subject = require("../models/SubjectModel");
const Flashdeck = require("../models/FlashdeckModel");
const Flashcard = require("../models/FlashcardModel");

/**
 * @route POST /create
 * @desc Create a new subject
 * @access Public
 */
router.post("/create", async (req, res) => {
  console.log("📥 Received body from frontend:", req.body); // Debug log

  const { username, subjectName, color } = req.body;

  if (!username || !subjectName || color === undefined) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const subject_id = uuidv4();

    const newSubject = new Subject({
      subject_id,
      username,
      subjectName,
      color,
      decks: [],
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    console.error("Error creating subject:", err);
    res.status(500).json({ error: "Failed to create subject." });
  }
});

/**
 * @route GET /:username
 * @desc Get all subjects for a user
 * @access Public
 */
router.get("/:username", async (req, res) => {
  try {
    const subjects = await Subject.find({ username: req.params.username });
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: "Failed to fetch subjects." });
  }
});

/**
 * @route DELETE /:id
 * @desc Delete a subject along with all associated decks and flashcards
 * @access Public
 */
router.delete("/:id", async (req, res) => {
  const subjectId = req.params.id;

  try {
    // Step 1: Find all decks linked to this subject
    const decks = await Flashdeck.find({ subject_id: subjectId });

    // Step 2: Delete all flashcards for each deck
    const flashcardDeletions = decks.map(deck =>
      Flashcard.deleteMany({ deck_id: deck.deck_id })
    );
    await Promise.all(flashcardDeletions);

    // Step 3: Delete all decks for the subject
    await Flashdeck.deleteMany({ subject_id: subjectId });

    // Step 4: Delete the subject itself
    await Subject.deleteOne({ subject_id: subjectId });

    res.json({ message: "Subject and all related decks/flashcards deleted successfully." });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ error: "Failed to delete subject and related data." });
  }
});

module.exports = router;
