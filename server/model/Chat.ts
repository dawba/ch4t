import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const chatSchema = new Schema({
  users: [
    {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  ],
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
