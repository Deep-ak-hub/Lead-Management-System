import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DATABASE;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
