import { Request } from "express";
import UserDocument from "../entities/user/UserDocument";
import ChatDocument from "../entities/chat/ChatDocument";
import MessageDocument from "../entities/message/MessageDocument";

export interface UserRequest extends Request {
  body: UserDocument;
}

export interface ChatRequest extends Request {
  body: ChatDocument;
}

export interface MessageRequest extends Request {
  body: MessageDocument;
}
