import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  chats: mongoose.Types.ObjectId[];
  verificationToken: string;
  isVerified: boolean;
  createdAt: Date;
}

export default UserDocument;
