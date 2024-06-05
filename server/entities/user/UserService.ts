import User from "./User";
import UserDocument from "../../types/UserDocument";
import { EmailService } from "../email/EmailService";

export class UserService {
  async getAllUsers() {
    return User.find();
  }

  async getUserById(id: string) {
    return User.findById;
  }

  async createUser(userData: UserDocument) {
    const verificationToken = crypto.randomUUID();
    const userDataWithVerificationToken = { ...userData, verificationToken };
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
    const user = await User.findOne({
      username: userData.username,
      password: userData.password,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
}
