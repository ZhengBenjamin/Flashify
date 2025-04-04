const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Subject = require("../models/SubjectModel");

// @route   POST /api/subject/create
// @desc    Create a new subject
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
    console.error("❌ Error creating subject:", err);
    res.status(500).json({ error: "Failed to create subject." });
  }
});

// @route   GET /api/subject/:username
// @desc    Get all subjects for a user
router.get("/:username", async (req, res) => {
  try {
    const subjects = await Subject.find({ username: req.params.username });
    res.json(subjects);
  } catch (err) {
    console.error("❌ Error fetching subjects:", err);
    res.status(500).json({ error: "Failed to fetch subjects." });
  }
});

module.exports = router;
