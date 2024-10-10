import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRoutes from "./routes/products.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

app.use("/api/products", productRoutes);

// Connect to MongoDB
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
