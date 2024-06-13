import { NextFunction, Response, Request } from "express";

import {
  validateEmail,
  validateMongoId,
  validatePassword,
} from "./validators.js";
import { UserService } from "../entities/user/UserService.js";

const userService = new UserService()

export const validateUserCreationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: `Missing required fields ${!username ? "username" : ""} ${
        !email ? "email" : ""
      } ${!password ? "password" : ""}}`,
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // if (!validatePassword(password)) {
  //   return res.status(400).json({ error: "Invalid password format" });
  // }

  const userByUsername = await userService.getUserByUsername(req.body.username);
  const userByEmail = await userService.getUserByEmail(req.body.email);

  if (userByUsername && userByEmail) {
    return res.status(400).json({ error: "Username and email already exists" });
  }

  if (userByUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }

  if (userByEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  next();
};

export const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!validateMongoId(id)) {
    return res.status(400).json({ error: "Invalid ObjectID format" });
  }

  next();
};

export const validateUserUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  const { id } = req.params;

  const userByUsername = await userService.getUserByUsername(username);
  const userByEmail = await userService.getUserByEmail(email);
  const userById = await userService.getUserById(id);

  if (!userById) {
    return res.status(400).json({ error: "User not found" });
  }

  if (userByUsername && userByUsername.id !== id) {
    return res.status(400).json({ error: "Username already exists" });
  }

  if (userByEmail && userByEmail.id !== id) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // if (!validatePassword(password)) {
  //   return res.status(400).json({ error: "Invalid password format" });
  // }

  next();
};

export const validateUserDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userById = await userService.getUserById(id);

  if (!userById) {
    return res.status(400).json({ error: "User not found" });
  }

  next();
};
