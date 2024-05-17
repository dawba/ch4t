import { Request, Response } from "express";
import * as messageService from "../services/MessageService.js";

export const getAllUserMessages = async (req: Request, res: Response) => {
  return await messageService.getAllUserMessages(req.params.id);
};

export const getMessageById = async (req: Request, res: Response) => {
  const message = await messageService.getMessageById(req.params.id);
  res.json(message);
};

export const createMessage = async (req: Request, res: Response) => {
  const message = await messageService.createMessage(req.body);
  res.json(message);
};

export const updateMessage = async (req: Request, res: Response) => {
  const message = await messageService.updateMessage(req.params.id, req.body);
  res.json(message);
};

export const deleteMessage = async (req: Request, res: Response) => {
  await messageService.deleteMessage(req.params.id);
  res.status(204).send();
};
