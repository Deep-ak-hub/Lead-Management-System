import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/admin.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.DATABASE;

async function seedAdmin() {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    console.log("MongoDB connected");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Clear existing admins (optional)
    await Admin.deleteMany();

    const admins = [
      {
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        email: "superadmin@example.com",
        password: hashedPassword,
        role: "superadmin",
      },
      {
        email: "vaporuser69@gmail.com",
        password: hashedPassword,
        role: "superadmin",
      },
      {
        email: "test@example.com",
        password: hashedPassword,
        role: "admin"
      }
    ];

    await Admin.insertMany(admins);

    console.log("Admin data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exit(1);
  }
}

seedAdmin();
