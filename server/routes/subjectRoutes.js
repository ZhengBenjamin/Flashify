const express = require("express");
const router = express.Router();
const Subject = require("../models/SubjectModel");
const User = require("../models/UserModel");

// POST /api/subjects — Create a new subject
router.post("/", async (req, res) => {
  const { name, color, username } = req.body;

  if (!name || !username) {
    return res.status(400).json({ message: "Subject name and username are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const subject = new Subject({
      name,
      color: color || "#ffffff",
      user: user._id,
    });

    const saved = await subject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Subject creation error:", error);
    res.status(500).json({ message: "Error creating subject" });
  }
});

// POST /api/subjects/user — Fetch subjects for a given username
router.post("/user", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const subjects = await Subject.find({ user: user._id });
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects by user:", error);
    res.status(500).json({ message: "Server error fetching subjects" });
  }
});

module.exports = router;
