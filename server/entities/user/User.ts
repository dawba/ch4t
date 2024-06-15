import mongoose from "mongoose";
import UserDocument from "./UserDocument.js";
const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: ObjectId,
    ref: "Image",
    required: false,
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
  chats: [
    {
      type: ObjectId,
      ref: "Chat",
    },
  ],
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model<UserDocument>("User", userSchema);

export default User;
