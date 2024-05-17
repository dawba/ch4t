import { Request, Response } from "express";
import * as userService from "../services/UserService.js";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await userService.getUserById(id);
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(200).json({
    message: "User created successfully",
    user,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    message: "User updated successfully",
    user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({
    message: "User deleted successfully",
  });
};
