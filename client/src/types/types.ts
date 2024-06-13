// BACKEND TYPES
import mongoose, { Types } from 'mongoose';
import * as React from 'react';

export type ID = mongoose.Types.ObjectId;

export type ChatData = {
  _id: string;
  users: ID[];
  messages: ID[];
  createdAt: Date;
};

export type MessageData = {
  _id: string;
  content: string;
  sender: ID;
  chat: ID;
  readStatus: { recipient: ID; read: boolean }[];
  createdAt: Date;
};

// ===================================================================
// FRONTEND TYPES

export type Chat = {
  id: string;
  chatName: string;
  profilePicture: string;
  lastMessage: string;
  lastSender: string;
  isLastMessageRead: boolean;
  users: ID[];
  messages: ID[];
};

export interface MessageTileProps {
  id: string;
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
