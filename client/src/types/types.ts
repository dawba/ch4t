// BACKEND TYPES
import mongoose from 'mongoose';
import * as React from 'react';

export type ID = mongoose.Types.ObjectId;

export type UserData = {
  _id: ID;
  username: string;
  email: string;
  chats: ID[];
  isVerified: boolean;
  createdAt: Date;
};

export type PartialUser = { username: string; userId: ID };

export type ChatData = {
  _id: ID;
  users: PartialUser[];
  messages: ID[];
  name: string;
  chatPicture: ID;
  createdAt: Date;
};

export type MessageData = {
  _id: ID;
  content: string;
  sender: ID;
  chat: ID;
  readStatus: { recipient: ID; read: boolean }[];
  createdAt: Date;
};

export type NewMessageData = Omit<MessageData, '_id'>;

export type ImageData = {
  _id: ID;
  name: string;
  data: Buffer;
  contentType: string;
  createdAt: Date;
};

export type NewImageData = Omit<ImageData, '_id'>;

// ===================================================================
// FRONTEND TYPES

export type Chat = {
  id: ID;
  chatName: string;
  chatPicture: Image | null;
  lastMessage: string;
  lastSender: string;
  isLastMessageRead: boolean;
  users: PartialUser[];
  messages: MessageTileProps[];
};

export type User = {
  id: ID;
  email: string;
  username: string;
  chats: ID;
  isVerified: boolean;
  verificationToken: string;
  createdAt: Date;
};

export interface MessageTileProps {
  id: ID;
  message: string;
  senderId: ID;
  senderName: string;
  timeSent: string;
  messageSentByUser: boolean;
}

export type Image = {
  id: ID;
  url: string;
  name: string;
  contentType: string;
  createdAt: Date;
};

export type Credentials = {
  username: string;
  password: string;
};

export type SVGIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export type AlertIconState = 'hidden' | 'yellow' | 'red';

export type MenuItem = 'DirectChats' | 'GroupChats' | 'AddChat' | 'Settings';

export type ImageContext = 'Chat' | 'User' | 'Message';

export type ApiResponse = {
  message: string;
  data: object;
};
