// Contains database connection logic

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config(); 

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB, client };
