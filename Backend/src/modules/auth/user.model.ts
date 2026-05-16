import mongoose, { Schema } from "mongoose";
import { IUser } from "./auth.types";

const UserSchema = new Schema<IUser>(
    
  {
    name: {
      type: String,
      required: true,
    },

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
      enum: ["admin", "sales"],
      default: "sales",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>(
  "User",
  UserSchema
);