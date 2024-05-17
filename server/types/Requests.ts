import { Request } from "express";
import UserDocument from "./UserDocument";
import ChatDocument from "./ChatDocument";
import MessageDocument from "./MessageDocument";

export interface UserRequest extends Request {
  body: UserDocument;
}

export interface ChatRequest extends Request {
  body: ChatDocument;
}

export interface MessageRequest extends Request {
  body: MessageDocument;
}
