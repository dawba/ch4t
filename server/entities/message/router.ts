import { MessageController } from "./MessageController.js";
import express from "express";

const messageController = new MessageController();
const MessageRouter = express.Router();

MessageRouter.get("/:id", messageController.getAllUserMessages);
MessageRouter.get("/user/:id", messageController.getMessageById);
MessageRouter.get("/chat/:id", messageController.getAllChatMessages);

MessageRouter.post("/", messageController.createMessage);

MessageRouter.put("/:id", messageController.updateMessage);

MessageRouter.delete("/:id", messageController.deleteMessage);

export default MessageRouter;
