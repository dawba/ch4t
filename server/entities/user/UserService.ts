import User from "./User.js";
import UserDocument from "./UserDocument.js";
import { EmailService } from "../email/EmailService.js";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: "config.env" });

export class UserService {
  async getAllUsers() {
    return User.find();
  }

  async getUserById(id: string) {
    return User.findById(id);
  }

  async createUser(userData: UserDocument) {
    const verificationToken = crypto.randomUUID();

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userDataWithVerificationToken = {
      ...userData,
      password: hashedPassword,
      verificationToken,
    };

    const user = new User(userDataWithVerificationToken);

    EmailService.sendRegistrationMailMessage(user.email, verificationToken);
    await user.save();

    return user;
  }

  async confirmUser(token: string) {
    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.updateOne({ isVerified: true });
  }

  async updateUser(id: string, userData: any) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string) {
    await User.findByIdAndDelete(id);
  }

  async getUserByUsername(username: string) {
    return User.findOne({
      username,
    });
  }

  async getUserByEmail(email: string) {
    return User.findOne({
      email,
    });
  }

  async loginUser(userData: UserDocument) {
    // Find user by username first
    const user = await User.findOne({ username: userData.username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  async getHashedPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
