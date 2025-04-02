const mongoose = require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" } // how would we change this? This might also be a secuity issue
}, { timestamps: true });

module.exports = mongoose.model("UserModel", UserSchema);
