// Main entry point

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); 
connectDB(); 

const app = express();

app.use(express.json()); 
app.use(cors());

// Import authentication routes to access api calls for user registration, login, and deletion
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

// Import card routes to access api calls for flashcard creation, retrieval, updating, and deletion
const cardRoutes = require("./routes/cardRoutes.js");
app.use("/api/card", cardRoutes);

// Import deck routes to access api calls for flashdeck creation, retrieval, updating, and deletion
const deckRoutes = require("./routes/deckRoutes.js");
app.use("/api/deck", deckRoutes);

app.get("/", (req, res) => {
  res.send("Flashify API is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
