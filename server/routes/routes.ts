import express from "express";
import * as userController from "../controllers/UserController.js";
import * as chatController from "../controllers/ChatController.js";
import * as messageController from "../controllers/MessageController.js";
import {
  validateIdMiddleware,
  validateUserCreationMiddleware,
  validateUserDeleteMiddleware,
  validateUserUpdateMiddleware,
} from "../middleware/middleware.js";

const router = express.Router();

router.get("/user", userController.getAllUsers);
router.get("/user/:id", validateIdMiddleware, userController.getUserById);
router.post("/user", validateUserCreationMiddleware, userController.createUser);
router.put(
  "/user/:id",
  validateIdMiddleware,
  validateUserUpdateMiddleware,
  userController.updateUser,
);
router.delete(
  "/user/:id",
  validateIdMiddleware,
  validateUserDeleteMiddleware,
  userController.deleteUser,
);

router.get("/message/:id", messageController.getAllUserMessages);
router.get(
  "message/user/:id",
  validateIdMiddleware,
  messageController.getMessageById,
);
router.post("/message", messageController.createMessage);
router.put("/message/:id", messageController.updateMessage);
router.delete("/message/:id", messageController.deleteMessage);

router.get("/chat", chatController.getAllChats);
router.get("/chat/:id", validateIdMiddleware, chatController.getChatById);
router.post("/chat", chatController.createChat);
router.put("/chat/:id", validateIdMiddleware, chatController.updateChat);
router.delete("/chat/:id", validateIdMiddleware, chatController.deleteChat);

export default router;
