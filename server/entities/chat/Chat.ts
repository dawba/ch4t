import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const userSubSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const chatSchema = new Schema({
  users: [userSubSchema],
  chatName: {
    type: String || null,
    default: null,
  },
  messages: [
    {
      type: ObjectId,
      ref: "Message",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model("Chat", chatSchema);

export default Chat;
