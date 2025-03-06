const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema({

flashcard_id: { type: String, required: true, unique: true },
deck_id: { type: String, required: true, unique: true },
username: { type: String, required: true, unique: true },
description: { type: String, default: "Null" },
front: { type: String, required: true },
back: { type: String, required: true }

});

module.exports = mongoose.model("FlashcardModel", FlashcardSchema);