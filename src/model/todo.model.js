import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.models.Todo || model("Todo", todoSchema);
