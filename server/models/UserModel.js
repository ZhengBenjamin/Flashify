/**
 * User Mongoose schema definition.
 *
 * Stores user account information including credentials and role.
 * Used for authentication, authorization, and linking created content.
 *
 * @module UserModel
 */
const mongoose = require("mongoose");

/**
 * UserSchema defines the structure of user documents.
 *
 * @property {string} username - Unique username for login and identification
 * @property {string} email - User's email address (must be unique)
 * @property {string} password - Hashed password for secure authentication
 * @property {string} role - User role (e.g., "user", "admin"); defaults to "user"
 * @property {Date} createdAt - Timestamp when the user was created
 * @property {Date} updatedAt - Timestamp when the user was last updated
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("UserModel", UserSchema);
