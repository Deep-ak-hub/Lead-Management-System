import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import dotenv from "dotenv";
import { hashPassword } from "../utils/password.utils.js";

dotenv.config();

const MONGO_URI = process.env.DATABASE;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

async function seedAdmin() {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    const hashedPassword = await hashPassword(ADMIN_PASSWORD, 10);

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
