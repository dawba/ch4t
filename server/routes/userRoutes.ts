import express from "express";
import { Request, Response } from "express";

import User from "../model/User";
import { UserRequest } from "../types/Requests";
import Chat from "../model/Chat";

const router = express.Router();

// Get all users
router.get("/user", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// Get user by specified id
router.get("/user/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Create a new user
router.post("/user", async (req: UserRequest, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Update a user
router.put("/user/:id", async (req: UserRequest, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// Delete a user
router.delete("/user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  await Chat.updateMany({ users: userId }, { $pull: { users: userId } });

  res.json({ message: "User has been successfully deleted" });
});

export default router;
