const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//loading environment variable from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB. Database created"))
  .catch((err) => console.log("Failed to connect MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
