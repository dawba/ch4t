import mongoose from "mongoose";
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
    const users = chatData.users.map((user) => ({
      userId: new mongoose.Types.ObjectId(user.userId),
      username: user.username,
    }));

    const chat = new Chat({
      ...chatData,
      users,
    });

    await chat.save();

    const userIds = users.map((user) => user.userId);

    await User.updateMany(
      { _id: { $in: userIds } },
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
    const objectId = new mongoose.Types.ObjectId(id);
    return Chat.find({ "users.userId": objectId });
  }

  async removeUserFromChat(chatId: string, userId: string) {
    await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } });
  }
}
