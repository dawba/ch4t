import Message from "./Message.js";
import Chat from "../chat/Chat.js";
import mongoose from "mongoose";

export class MessageService {
  async getAllUserMessages(userId: string) {
    return Message.find({ sender: userId });
  }

  async getMessageById(id: string) {
    return Message.findById(id);
  }

  async createMessage(messageData: any) {
    const message = new Message(messageData);
    await message.save();

    const { chat } = messageData;

    await Chat.findByIdAndUpdate(chat, { $push: { messages: message._id } });

    return message;
  }

  async createMessageForChat(chatId: string, messageData: any) {
    const message = new Message({
      sender: messageData.sender,
      senderName: messageData.senderName,
      content: messageData.message,
      chat: chatId,
    });

    await message.save();

    await Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } });
    return message;
  }

  async updateMessage(id: string, messageData: any) {
    return await Message.findByIdAndUpdate(id, messageData, {
      new: true,
    });
  }

  async deleteMessage(id: string) {
    return await Message.findByIdAndUpdate(
      id,
      { content: "" },
      {
        new: true,
      },
    );
  }

  async getAllChatMessages(chatId: string) {
    return Message.find({ chat: chatId });
  }
}
