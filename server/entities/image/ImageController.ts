import { Request, Response } from "express";
import { ImageService } from "./ImageService";

export class ImageController {
  imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();

    // Bind methods to preserve the `this` context
    this.getImageById = this.getImageById.bind(this);
    this.createImageForChat = this.createImageForChat.bind(this);
    this.createImageForUser = this.createImageForUser.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  async getImageById(req: Request, res: Response) {
    const image = await this.imageService.getImageById(req.params.id);
    res.json(image);
  }

  async createImageForChat(req: Request, res: Response) {
    const image = await this.imageService.createImageForChat(
      req.params.chatId,
      req.body,
    );
    res.status(201).json(image);
  }

  async createImageForUser(req: Request, res: Response) {
    const image = await this.imageService.createImageForUser(
      req.params.userId,
      req.body,
    );
    res.status(201).json(image);
  }

  async updateImage(req: Request, res: Response) {
    const image = await this.imageService.updateImage(req.params.id, req.body);
    res.json(image);
  }
}
