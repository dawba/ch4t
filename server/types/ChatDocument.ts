import mongoose from "mongoose";

interface ChatDocument extends mongoose.Document {
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export default ChatDocument;
