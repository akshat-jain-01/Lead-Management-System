import mongoose, { Schema} from "mongoose";
import { ILead } from "./lead.types";

const LeadSchema = new Schema<ILead>({

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,

      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Lost",
      ],

      default: "New",
    },

    source: {
      type: String,

      enum: [
        "Website",
        "Instagram",
        "Referral",
      ],

      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },

  {
    timestamps: true,
  }
);

export const Lead = mongoose.model<ILead>(
    "Lead",
    LeadSchema
  );