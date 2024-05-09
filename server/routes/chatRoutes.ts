import express from "express";
import { Request, Response } from "express";

import Chat from "../model/Chat";
import { ChatRequest } from "../types/Requests";
import User from "../model/User";
import Message from "../model/Message";

const router = express.Router();

// Get all chats
router.get("/chat", async (req: Request, res: Response) => {
  const chats = await Chat.find();
  res.json(chats);
});

// Get chat by specified id
router.get("/chat/:id", async (req: Request, res: Response) => {
  const chats = await Chat.find();
  res.json(chats);
});

// Create a new chat
router.post("/chat", async (req: ChatRequest, res: Response) => {
  const chat = new Chat(req.body);
  await chat.save();

  const users = req.body.users;

  await User.updateMany(
    { _id: { $in: users } },
    { $push: { chats: chat._id } },
  );

  res.json(chat);
});

// Update a chat
router.put("/chat/:id", async (req: ChatRequest, res: Response) => {
  const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(chat);
});

// Delete a chat
router.delete("/chat/:id", async (req: Request, res: Response) => {
  const chatId = req.params.id;

  await Chat.findByIdAndDelete(chatId);
  await Message.deleteMany({ chat: chatId });
  await User.updateMany({ chats: chatId }, { $pull: { chats: chatId } });
});

export default router;
