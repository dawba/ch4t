import express from "express";
import { UserController } from "./UserController";

const userController = new UserController();
const UserRouter = express.Router();

UserRouter.get("/", userController.getAllUsers);
UserRouter.get("/:id", userController.getUserById);
UserRouter.post("/", userController.createUser);
UserRouter.put("/:id", userController.updateUser);
UserRouter.delete("/:id", userController.deleteUser);

export default UserRouter;
