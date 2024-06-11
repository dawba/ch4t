import mongoose from 'mongoose'

type Chat = {
  _id: string
  users: mongoose.Types.ObjectId[]
  messages: mongoose.Types.ObjectId[]
  createdAt: Date
}

export type ChatData = {
  id: string
  chatName: string
  profilePicture: string
  lastMessage: string
  lastMessageSenderName: string
  lastMessageStatus: 'read' | 'unread'
  users: mongoose.Types.ObjectId[]
  messages: mongoose.Types.ObjectId[]
}

export interface IChatDataAdapter {
  getChats: (chatData: Chat[]) => ChatData[]
}
