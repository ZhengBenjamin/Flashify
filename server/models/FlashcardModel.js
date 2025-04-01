//flashcard schemes
const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema({
  flashcard_id: { type: String, required: true, unique: true }, 
  deck_id: { type: String, required: true }, 
  username: { type: String, required: true }, 
  front: { type: String, required: true },
  back: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("FlashcardModel", FlashcardSchema);
