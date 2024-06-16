import express from "express";
import { ChatController } from "./ChatController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const chatController = new ChatController();
const ChatRouter = express.Router();

ChatRouter.get("/all", chatController.getAllChats);
ChatRouter.get("/id/:id", chatController.getChatById);
ChatRouter.get("/all/user/:id", chatController.getAllUserChats);

ChatRouter.post("/create", authMiddleware, chatController.createChat);

ChatRouter.put("/:id", authMiddleware, chatController.updateChat);

ChatRouter.delete("/:id", authMiddleware, chatController.deleteChat);
ChatRouter.delete(
  "/:chatId/remove/user/:userId",
  authMiddleware,
  chatController.removeUserFromChat,
);

export default ChatRouter;
