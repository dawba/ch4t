import mongoose, { ObjectId } from "mongoose";
import Chat from "./Chat.js";
import User from "../user/User.js";
import Message from "../message/Message.js";
import ChatDocument from "./ChatDocument.js";

export class ChatService {
  async getAllChats() {
    return Chat.find();
  }

  async getChatById(id: string) {
    return Chat.findById(id);
  }

  async createChat(chatData: ChatDocument) {
    const chat = new Chat(chatData);
    await chat.save();

    const users = chatData.users.map(
      (id: mongoose.Types.ObjectId) => new mongoose.Types.ObjectId(id),
    );

    await User.updateMany(
      { _id: { $in: users } },
      { $push: { chats: chat._id } },
    );

    return chat;
  }

  async updateChat(id: string, chatData: ChatDocument) {
    return Chat.findByIdAndUpdate(id, chatData, { new: true });
  }

  async deleteChat(id: string) {
    Chat.findByIdAndDelete(id);
    Message.deleteMany({ chat: id });
    User.updateMany({ chats: id }, { $pull: { chats: id } });
  }

  async getAllUserChats(id: string) {
    return Chat.find({ users: id });
  }

  async removeUserFromChat(chatId: string, userId: string) {
    await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } });
  }
}
