import { Request, Response } from "express";
import { ChatService } from "./ChatService";
import { ChatRequest } from "../../types/Requests";

export class ChatController {
  chatService: ChatService;
  constructor() {
    this.chatService = new ChatService();
  }

  async getAllChats(req: Request, res: Response) {
    const chats = await this.chatService.getAllChats();
    res.json(chats);
  }

  async getChatById(req: Request, res: Response) {
    const chat = await this.chatService.getChatById(req.params.id);
    res.json(chat);
  }

  async createChat(req: ChatRequest, res: Response) {
    const chat = await this.chatService.createChat(req.body);
    res.json(chat);
  }

  async updateChat(req: ChatRequest, res: Response) {
    const chat = await this.chatService.updateChat(req.params.id, req.body);
    res.json(chat);
  }

  async deleteChat(req: Request, res: Response) {
    await this.chatService.deleteChat(req.params.id);
    res.status(204).send();
  }

  async getAllUserChats(req: Request, res: Response) {
    try {
      const chats = await this.chatService.getAllUserChats(req.params.id);
      console.log(chats);
      return res.json(chats);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
