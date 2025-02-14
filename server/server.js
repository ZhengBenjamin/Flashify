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

app.get("/", (req, res) => {
  res.send("Flashify API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
