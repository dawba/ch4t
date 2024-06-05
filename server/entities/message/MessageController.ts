import { Request, Response } from "express";
import { MessageService } from "./MessageService";

export class MessageController {
  messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  async getAllUserMessages(req: Request, res: Response) {
    return await this.messageService.getAllUserMessages(req.params.id);
  }

  async getMessageById(req: Request, res: Response) {
    const message = await this.messageService.getMessageById(req.params.id);
    res.json(message);
  }

  async createMessage(req: Request, res: Response) {
    const message = await this.messageService.createMessage(req.body);
    res.json(message);
  }

  async updateMessage(req: Request, res: Response) {
    const message = await this.messageService.updateMessage(
      req.params.id,
      req.body,
    );
    res.json(message);
  }

  async deleteMessage(req: Request, res: Response) {
    await this.messageService.deleteMessage(req.params.id);
    res.status(204).send();
  }

  async getAllChatMessages(req: Request, res: Response) {
    const messages = await this.messageService.getAllChatMessages(
      req.params.id,
    );
    res.json(messages);
  }
}
