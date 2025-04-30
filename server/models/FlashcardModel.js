/**
 * Flashcard Mongoose schema definition.
 *
 * Each flashcard is linked to a specific deck and user.
 * Stores a front and back for question/answer format.
 *
 * @module FlashcardModel
 */
const mongoose = require("mongoose");


/**
 * FlashcardSchema defines the structure of flashcard documents.
 *
 * @property {string} flashcard_id - Unique identifier for the flashcard
 * @property {string} deck_id - ID of the deck this flashcard belongs to
 * @property {string} username - Username of the flashcard owner
 * @property {string} front - Front side content of the flashcard (question/prompt)
 * @property {string} back - Back side content of the flashcard (answer)
 * @property {Date} createdAt - Timestamp for creation (added by `timestamps: true`)
 * @property {Date} updatedAt - Timestamp for last update (added by `timestamps: true`)
 */
const FlashcardSchema = new mongoose.Schema({
  flashcard_id: { type: String, required: true, unique: true }, 
  deck_id: { type: String, required: true }, 
  username: { type: String, required: true }, 
  front: { type: String, required: true },
  back: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("FlashcardModel", FlashcardSchema);
