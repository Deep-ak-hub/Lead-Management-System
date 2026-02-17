import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    installments: [
      {
        amount: Number,
        paidDate: Date,
      },
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Leads",
    },
    isComplete: { type: Boolean },
  },
  { timestamp: true },
);
const Project = mongoose.model("Project", projectModel);

export default Project;
