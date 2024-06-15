// BACKEND TYPES
import mongoose from 'mongoose';
import * as React from 'react';

export type ID = mongoose.Types.ObjectId;

export type ChatData = {
  _id: ID;
  users: ID[];
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

export type ImageData = {
  _id: ID;
  name: string;
  data: Buffer;
  contentType: string;
  createdAt: Date;
};

export type UserData = {
  _id: ID;
  email: string;
  username: string;
  chats: ID[];
  isVerified: boolean;
  createdAt: Date;
};

// ===================================================================
// FRONTEND TYPES

export type Chat = {
  id: ID;
  chatName: string;
  chatPicture: Image | null;
  lastMessage: string;
  lastSender: string;
  isLastMessageRead: boolean;
  users: ID[];
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

export type Message = {
  id: ID;
  content: string;
  sender: ID;
  chat: ID;
  readStatus: { recipient: ID; read: boolean }[];
  createdAt: Date;
};

export interface MessageTileProps {
  id: ID;
  message: string;
  senderName: string;
  timeSent: Date;
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

export type ApiResponse = {
  message: string;
  data: object;
};
