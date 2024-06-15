import mongoose from "mongoose";

interface ChatDocument extends mongoose.Document {
  users: { userId: mongoose.Types.ObjectId; username: string }[];
  chatName: string | null;
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export default ChatDocument;
