import express from "express";
import { ChatController } from "./ChatController.js";

const chatController = new ChatController();
const ChatRouter = express.Router();

ChatRouter.get("/all", chatController.getAllChats);
ChatRouter.get("/id/:id", chatController.getChatById);
ChatRouter.get("/user/:id", chatController.getAllUserChats);

ChatRouter.post("/create", chatController.createChat);

ChatRouter.put("/:id", chatController.updateChat);

ChatRouter.delete("/:id", chatController.deleteChat);
ChatRouter.delete(
  "/:chatId/remove/user/:userId",
  chatController.removeUserFromChat,
);

export default ChatRouter;
