import Image from "./Image";
import Chat from "../chat/Chat";
import User from "../user/User";

export class ImageService {
  async getImageById(id: string) {
    return Image.findById(id);
  }

  async createImageForChat(chatId: string, imageData: any) {
    const image = new Image(imageData);
    await image.save();

    await Chat.findByIdAndUpdate(chatId, {
      $replace: { chatPicture: imageData._id },
    });

    return image;
  }

  async createImageForUser(userId: string, imageData: any) {
    const image = new Image(imageData);
    await image.save();

    await User.findByIdAndUpdate(userId, {
      $replace: { profilePicture: imageData._id },
    });

    return image;
  }

  async updateImage(id: string, imageData: any) {
    return await Image.findByIdAndUpdate(id, imageData, {
      new: true,
    });
  }
}
