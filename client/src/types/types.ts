// BACKEND TYPES
import mongoose from 'mongoose';
import * as React from 'react';

export type Chat = {
  _id: string;
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
};

// FRONTEND TYPES

export type ChatData = {
  id: string;
  chatName: string;
  profilePicture: string;
  lastMessage: string;
  lastSender: string;
  isLastMessageRead: boolean;
  users: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
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
