import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  chats: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export default UserDocument;
