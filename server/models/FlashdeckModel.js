const mongoose = require("mongoose");

const FlashdeckSchema = new mongoose.Schema({
  deck_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  subject_id: { type: String, required: true }, // ✅ Add this line
  title: { type: String, required: true },
  card_count: { type: Number, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlashcardModel" }]
}, { timestamps: true });

module.exports = mongoose.model("FlashdeckModel", FlashdeckSchema);
