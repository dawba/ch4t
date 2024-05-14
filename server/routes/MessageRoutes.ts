import express from "express";
import { Request, Response } from "express";

import Message from "../model/Message";
import { MessageRequest } from "../types/Requests";
import Chat from "../model/Chat";

const router = express.Router();

// Get all use messages
router.get("/message/user/:id", async (req: Request, res: Response) => {
  const messages = await Message.find();
  res.json(messages);
});

// Get message by specified id
router.get("/message/:id", async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id);
  res.json(message);
});

// Create a new message
router.post("/message", async (req: MessageRequest, res: Response) => {
  const message = new Message(req.body);
  await message.save();

  const { chat } = req.body;

  await Chat.findByIdAndUpdate(chat, {
    $push: { messages: message._id },
  });

  res.json(message);
});

// Update a message
router.put("/message/:id", async (req: MessageRequest, res: Response) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(message);
});

// Delete a message
router.put("/message/:id", async (req: Request, res: Response) => {
  const messageId = req.params.id;

  const message = await Message.findByIdAndUpdate(
    messageId,
    { content: "" },
    {
      new: true,
    },
  );

  res.json(message);
});
