import mongoose from "mongoose";
import { Schema } from "mongoose";

const leadsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Follow Up", "Uncategorized", "Client", "Student"],
      default: "Active",
    },

    followUp: {
      type: Date,
    },

    isFollowedUp: {
      type: Boolean,
      default: false,
    },

    inquiry: {
      type: String,
      enum: ["course", "project"],
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

leadsSchema.index({ email: 1, admin: 1 }, { unique: true });

const Leads = mongoose.model("Leads", leadsSchema);
export default Leads;
