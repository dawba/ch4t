import { Request, Response } from "express";
import * as chatService from "../services/ChatService.js";
import { ChatRequest } from "../types/Requests";

export const getAllChats = async (req: Request, res: Response) => {
  const chats = await chatService.getAllChats();
  res.json(chats);
};

export const getChatById = async (req: Request, res: Response) => {
  const chat = await chatService.getChatById(req.params.id);
  res.json(chat);
};

export const createChat = async (req: ChatRequest, res: Response) => {
  const chat = await chatService.createChat(req.body);
  res.json(chat);
};

export const updateChat = async (req: ChatRequest, res: Response) => {
  const chat = await chatService.updateChat(req.params.id, req.body);
  res.json(chat);
};

export const deleteChat = async (req: Request, res: Response) => {
  await chatService.deleteChat(req.params.id);
  res.status(204).send();
};
