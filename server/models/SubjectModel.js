/**
 * Subject Mongoose schema definition.
 *
 * Represents a study subject/category created by a user.
 * Each subject can contain multiple flashdeck references.
 *
 * @module SubjectModel
 */
const mongoose = require("mongoose");

/**
 * SubjectSchema defines the structure of subject documents.
 *
 * @property {string} subject_id - Unique identifier for the subject (UUID from frontend)
 * @property {string} username - Username of the user who owns this subject
 * @property {string} subjectName - Name of the subject (e.g., "Math", "Biology")
 * @property {number} color - Subject color stored as an integer (converted from hex)
 * @property {ObjectId[]} decks - References to FlashdeckModel documents
 * @property {Date} createdAt - Timestamp for subject creation
 * @property {Date} updatedAt - Timestamp for the last subject update
 */
const SubjectSchema = new mongoose.Schema({
  subject_id: { type: String, required: true, unique: true }, // UUID from frontend
  username: { type: String, required: true },                 // From logged-in user
  subjectName: { type: String, required: true },              // e.g., "Math", "Biology"
  color: { type: Number, required: true },                    // Stored as int (converted from hex)
  decks: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlashdeckModel" }] // Related flash decks
}, { timestamps: true });

module.exports = mongoose.model("SubjectModel", SubjectSchema);
