/**
 * Main entry point for the Flashify backend server.
 *
 * Initializes Express, connects to MongoDB, configures middleware, 
 * and sets up route handlers for auth, cards, decks, and subjects.
 *
 * @module server
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

/**
 * Route group for user authentication
 * @route /api/auth
 */
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

/**
 * Route group for flashcard operations
 * @route /api/card
 */
const cardRoutes = require("./routes/cardRoutes.js");
app.use("/api/card", cardRoutes);

/**
 * Route group for flashdeck operations
 * @route /api/deck
 */
const deckRoutes = require("./routes/deckRoutes.js");
app.use("/api/deck", deckRoutes);

/**
 * Route group for subject operations
 * @route /api/subject
 */
const subjectRoutes = require("./routes/subjectRoutes.js");
app.use("/api/subject", subjectRoutes);

/**
 * Root endpoint to confirm API is running
 * @route GET /
 * @returns {string} - Status message
 */
app.get("/", (req, res) => {
  res.send("Flashify API is running...");
});

// Start the server on the specified port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
