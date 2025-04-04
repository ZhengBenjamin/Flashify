const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  // Associate the subject with the user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Subject", SubjectSchema);
