import { MessageController } from "./MessageController.js";
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

const messageController = new MessageController();
const MessageRouter = express.Router();

MessageRouter.get(
  "/user/:id/all",
  authMiddleware,
  messageController.getAllUserMessages,
);
MessageRouter.get("/:id", authMiddleware, messageController.getMessageById);
MessageRouter.get(
  "/chat/:id",
  authMiddleware,
  messageController.getAllChatMessages,
);

MessageRouter.post("/create", authMiddleware, messageController.createMessage);

MessageRouter.put("/:id", authMiddleware, messageController.updateMessage);

MessageRouter.delete("/:id", authMiddleware, messageController.deleteMessage);

export default MessageRouter;
