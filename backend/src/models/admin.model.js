import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },
    purchasedPlan: {
      type: String,
      default: "111",
      // 111: no plan
      // 001: purchased service only
      // 010: purchased leads only
      // 011: purchased both plan
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
