import mongoose from "mongoose";

export interface ChatDocument extends mongoose.Document {
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
}
