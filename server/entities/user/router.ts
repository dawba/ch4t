import express from "express";
import { UserController } from "./UserController.js";

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get("/", userController.getAllUsers);
UserRouter.get("/:id", userController.getUserById);
UserRouter.get("/:username", userController.getUserByUsername);

UserRouter.post("/", userController.createUser);
UserRouter.post("/login", userController.loginUser);
UserRouter.post("/confirm", userController.confirmUser);

UserRouter.put("/:id", userController.updateUser);

UserRouter.delete("/:id", userController.deleteUser);

export default UserRouter;
