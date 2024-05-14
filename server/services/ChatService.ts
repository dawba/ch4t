import Chat from "../model/Chat";
import User from "../model/User";
import Message from "../model/Message";
import ChatDocument from "../types/ChatDocument";

export const getAllChats = () => {
  return Chat.find();
};

export const getChatById = (id: string) => {
  return Chat.findById(id);
};

export const createChat = (chatData: ChatDocument) => {
  const chat = new Chat(chatData);
  chat.save();

  const users = chatData.users;

  User.updateMany({ _id: { $in: users } }, { $push: { chats: chat._id } });

  return chat;
};

export const updateChat = (id: string, chatData: ChatDocument) => {
  return Chat.findByIdAndUpdate(id, chatData, { new: true });
};

export const deleteChat = (id: string) => {
  Chat.findByIdAndDelete(id);
  Message.deleteMany({ chat: id });
  User.updateMany({ chats: id }, { $pull: { chats: id } });
};
