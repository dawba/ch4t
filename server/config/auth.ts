import jwt from "jsonwebtoken";
import UserDocument from "../entities/user/UserDocument";
import * as dotenv from "dotenv";

dotenv.config({ path: "config.env" });

const secretKey = process.env.JWT_SECRET_KEY || "";

export const generateToken = (user: UserDocument) => {
  const payload = { id: user._id, username: user.username };
  console.log("pld", payload, " ", "secret:", secretKey);
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
