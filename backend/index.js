import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import mainRouter from "./routes/index.js";
import cors from "cors";
//loading environment variable from .env file
dotenv.config({
  path: "./.env",
});
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection error ${err}`);
  });
