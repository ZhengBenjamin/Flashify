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

// Import authentication routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

// Import card routes
const cardRoutes = require("./routes/cardRoutes.js");
app.use("/api/card", cardRoutes);

// Import deck routes
const deckRoutes = require("./routes/deckRoutes.js");
app.use("/api/deck", deckRoutes);

// Import subject routes
const subjectRoutes = require("./routes/subjectRoutes.js");
app.use("/api/subject", subjectRoutes);

app.get("/", (req, res) => {
  res.send("Flashify API is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
