const mongoose = require("mongoose");
const Card = require("../models/FlashcardModel");

//flashdeck schema
const FlashdeckSchema = new mongoose.Schema({
  deck_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  card_count: { type: Number, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlashcardModel" }] // Referencing Flashcard model
}, { timestamps: true });

module.exports = mongoose.model("FlashdeckModel", FlashdeckSchema);
