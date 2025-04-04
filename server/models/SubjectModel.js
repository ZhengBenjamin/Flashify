const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subject_id: { type: String, required: true, unique: true }, // UUID from frontend
  username: { type: String, required: true },                 // From logged-in user
  subjectName: { type: String, required: true },              // e.g., "Math", "Biology"
  color: { type: Number, required: true },                    // Stored as int (converted from hex)
  decks: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlashdeckModel" }] // Related flash decks
}, { timestamps: true });

module.exports = mongoose.model("SubjectModel", SubjectSchema);
