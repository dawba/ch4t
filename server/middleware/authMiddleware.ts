import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }

  req.user = decoded;
  next();
};
