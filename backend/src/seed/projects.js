import mongoose from "mongoose";
import Project from "../models/projects.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.DATABASE;

const adminId = "695de73c40db19703d5042d3";
const leadId = "69673c67246a3b409e196b4e";

const seedProjects = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const projects = [
      {
        name: "Website Development",
        totalBudget: 150000,
        installments: [
          { amount: 50000, paidDate: new Date("2025-01-10") },
          { amount: 50000, paidDate: new Date("2025-02-10") },
        ],
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-04-01"),
        admin: adminId,
        lead: leadId,
        isComplete: false,
      },
      {
        name: "Mobile App Development",
        totalBudget: 300000,
        installments: [{ amount: 100000, paidDate: new Date("2025-01-15") }],
        startDate: new Date("2025-01-10"),
        endDate: new Date("2025-06-10"),
        admin: adminId,
        lead: leadId,
        isComplete: false,
      },
      {
        name: "SEO Optimization",
        totalBudget: 80000,
        installments: [
          { amount: 40000, paidDate: new Date("2025-01-20") },
          { amount: 40000 },
        ],
        startDate: new Date("2025-01-20"),
        endDate: new Date("2025-03-20"),
        admin: adminId,
        lead: leadId,
        isComplete: true,
      },
    ];

    await Project.insertMany(projects);

    console.log("✅ Projects seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProjects();
