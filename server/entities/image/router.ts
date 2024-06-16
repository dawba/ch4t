import { ImageController } from "./ImageController.js";
import express from "express";

const imageController = new ImageController();
const ImageRouter = express.Router();

ImageRouter.get("/:id", imageController.getImageById);

ImageRouter.post("/chat/:chatId", imageController.createImageForChat);
ImageRouter.post("/user/:userId", imageController.createImageForUser);

ImageRouter.put("/:id", imageController.updateImage);

export default ImageRouter;
