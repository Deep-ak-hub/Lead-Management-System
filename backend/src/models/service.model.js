import mongoose from "mongoose";
import { Schema } from "mongoose";

const serviceModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

serviceModel.index({ title: 1, admin: 1 }, { unique: true });
const Service = mongoose.model("Service", serviceModel);

export default Service;
