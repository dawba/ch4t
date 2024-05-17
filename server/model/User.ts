import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const userSchema = new Schema({
  username: {
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
  chats: {
    type: ObjectId,
    ref: "Chat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
