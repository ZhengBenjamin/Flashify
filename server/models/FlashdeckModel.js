/**
 * Flashdeck Mongoose schema definition.
 *
 * Represents a deck of flashcards created by a user under a specific subject.
 * Each deck includes a title, card count, and references to individual flashcards.
 *
 * @module FlashdeckModel
 */
const mongoose = require("mongoose");

/**
 * FlashdeckSchema defines the structure of flashdeck documents.
 *
 * @property {string} deck_id - Unique identifier for the flashdeck
 * @property {string} username - Username of the deck's creator
 * @property {string} subject_id - ID of the subject this deck belongs to
 * @property {string} title - Title of the flashdeck
 * @property {number} card_count - Number of cards in the flashdeck
 * @property {ObjectId[]} cards - References to FlashcardModel documents
 * @property {Date} createdAt - Timestamp for creation (added by `timestamps: true`)
 * @property {Date} updatedAt - Timestamp for last update (added by `timestamps: true`)
 */
const FlashdeckSchema = new mongoose.Schema({
  deck_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  subject_id: { type: String, required: true }, 
  title: { type: String, required: true },
  card_count: { type: Number, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlashcardModel" }]
}, { timestamps: true });

module.exports = mongoose.model("FlashdeckModel", FlashdeckSchema);
