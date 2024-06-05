import { MessageController } from "./MessageController";
import express from "express";

const messageController = new MessageController();
const MessageRouter = express.Router();

MessageRouter.get("/:id", messageController.getAllUserMessages);
MessageRouter.get("/user/:id", messageController.getMessageById);
MessageRouter.post("/", messageController.createMessage);
MessageRouter.put("/:id", messageController.updateMessage);
MessageRouter.delete("/:id", messageController.deleteMessage);
MessageRouter.get("/chat/:id", messageController.getAllChatMessages);

export default MessageRouter;
