import express from "express";
import { ChatController } from "./ChatController.js";

const chatController = new ChatController();
const ChatRouter = express.Router();

ChatRouter.get("/", chatController.getAllChats);
ChatRouter.get("/:id", chatController.getChatById);
ChatRouter.get("/user/:id", chatController.getAllUserChats);

ChatRouter.post("/", chatController.createChat);

ChatRouter.put("/:id", chatController.updateChat);

ChatRouter.delete("/:id", chatController.deleteChat);

export default ChatRouter;
