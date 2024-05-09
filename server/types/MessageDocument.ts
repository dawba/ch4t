import mongoose from "mongoose";

interface MessageDocument extends mongoose.Document {
  sender: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId;
  content: string;
  readStatus: { recipient: mongoose.Types.ObjectId; read: boolean }[];
  createdAt: Date;
}

export default MessageDocument;
