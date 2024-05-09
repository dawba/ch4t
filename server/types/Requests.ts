import express from "express";
import { Request } from "express";
import UserDocument from "./UserDocument";
import { ChatDocument } from "./ChatDocument";

export interface UserRequest extends Request {
  body: UserDocument;
}

export interface ChatRequest extends Request {
  body: ChatDocument;
}
