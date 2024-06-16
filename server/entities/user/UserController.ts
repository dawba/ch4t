import { Request, Response } from "express";
import { UserService } from "./UserService.js";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();

    // Bind methods to preserve the `this` context
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.confirmUser = this.confirmUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getUserByUsername = this.getUserByUsername.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await this.userService.getUserById(id);
    res.json(user);
  }

  async getUserByUsername(req: Request, res: Response) {
    const username = req.params.username;

    const user = await this.userService.getUserByUsername(username);
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    console.log(`Received a request to create user.`);
    const user = await this.userService.createUser(req.body);
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);
    res.status(204).json({
      message: "User deleted successfully",
    });
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { user, token } = await this.userService.loginUser(req.body);
      return res.status(200).json({
        message: "User logged in successfully",
        user,
        token,
      });
    } catch (error) {
      console.error("Error when logging in user:", req.body, error);
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  }

  async confirmUser(req: Request, res: Response) {
    console.log(
      `Received a request to confirm user with a token: ${req.params.token}`,
    );

    try {
      const user = await this.userService.confirmUser(req.params.token);
      res.status(200).json({
        message: "User confirmed successfully",
        user,
      });
    } catch (error) {
      console.error("Error when confirming user:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const email = req.params.email;
    console.log(email);

    const user = await this.userService.getUserByEmail(email);
    res.json(user);
  }
}
