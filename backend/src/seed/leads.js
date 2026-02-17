import mongoose from "mongoose";
import dotenv from "dotenv";
import Leads from "../models/leads.model.js";

dotenv.config();

const SUPER_ADMIN_ID = "695de73c40db19703d5042d4"; // your admin id
const ADMIN_ID = "695de73c40db19703d5042d3"; // your admin id

const leadsData = [
  {
    name: "Ramesh Sharma",
    email: "ramesh1@gmail.com",
    phone: "9800000001",
    status: "Active",
    inquiry: "project",
    admin: ADMIN_ID,
    remarks: "Interested in web app development",
  },
  {
    name: "Sita Koirala",
    email: "sita@gmail.com",
    phone: "9800000002",
    status: "Follow Up",
    followUp: new Date(),
    inquiry: "course",
    admin: SUPER_ADMIN_ID,
    remarks: "Asked about MERN course",
  },
  {
    name: "Bikash Thapa",
    email: "bikash@gmail.com",
    phone: "9800000003",
    status: "Client",
    inquiry: "project",
    admin: ADMIN_ID,
    remarks: "Confirmed project deal",
  },
  {
    name: "Anita Gurung",
    email: "anita@gmail.com",
    phone: "9800000004",
    status: "Student",
    inquiry: "course",
    admin: SUPER_ADMIN_ID,
    remarks: "Enrolled in React course",
  },
  {
    name: "Prakash Adhikari",
    email: "prakash@gmail.com",
    phone: "9800000005",
    status: "Uncategorized",
    inquiry: "project",
    admin: ADMIN_ID,
  },
];

const seedLeads = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("MongoDB connected");

    // Optional: clear existing leads for this admin
    await Leads.deleteMany();

    await Leads.insertMany(leadsData);
    console.log("Leads seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedLeads();
