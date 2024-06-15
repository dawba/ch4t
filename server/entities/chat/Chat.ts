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
  name: {
    type: String,
    required: true,
    unique: true,
  },
  chatPicture: {
    type: ObjectId,
    ref: "Image",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model("Chat", chatSchema);

export default Chat;
