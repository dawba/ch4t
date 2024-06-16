import express from "express";
import { UserController } from "./UserController.js";
import { authMiddleware } from "../../middleware/authMiddleware";

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get("/all", userController.getAllUsers);
UserRouter.get("/id/:id", userController.getUserById);
UserRouter.get("/username/:username", userController.getUserByUsername);
UserRouter.get("/email/:email", userController.getUserByEmail);

UserRouter.post("/register", userController.createUser);
UserRouter.post("/login", userController.loginUser);
UserRouter.post("/confirm/:token", userController.confirmUser);

UserRouter.put("/:id", authMiddleware, userController.updateUser);

UserRouter.delete("/:id", authMiddleware, userController.deleteUser);

export default UserRouter;
