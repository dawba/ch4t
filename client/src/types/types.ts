// BACKEND TYPES
import mongoose, { Types } from 'mongoose';
import * as React from 'react';

export type ID = mongoose.Types.ObjectId;

export type ChatData = {
  _id: ID;
  users: ID[];
  messages: ID[];
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
  profilePicture: string;
  lastMessage: string;
  lastSender: string;
  isLastMessageRead: boolean;
  users: ID[];
  messages: ID[];
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
  senderName: string | Types.ObjectId;
  timeSent: Date;
  messageSentByUser: boolean;
}

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
