import express from "express";
import * as chatController from "../controllers/ChatController";

const router = express.Router();

router.get("/chat", chatController.getAllChats);
router.get("/chat/:id", chatController.getChatById);
router.post("/chat", chatController.createChat);
router.put("/chat/:id", chatController.updateChat);
router.delete("/chat/:id", chatController.deleteChat);

export default router;
