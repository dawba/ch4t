import Image from "./Image";
import Chat from "../chat/Chat";
import User from "../user/User";
import ImageDocument from "./ImageDocument";

export class ImageService {
  async getImageById(id: string) {
    return Image.findById(id);
  }

  async createImageForChat(chatId: string, imageData: ImageDocument) {
    const image = new Image(imageData);
    await image.save();

    await Chat.findByIdAndUpdate(chatId, {
      $replace: { chatPicture: imageData._id },
    });

    return image;
  }

  async createImageForUser(userId: string, imageData: ImageDocument) {
    const image = new Image(imageData);
    await image.save();

    await User.findByIdAndUpdate(userId, {
      $replace: { profilePicture: imageData._id },
    });

    return image;
  }

  async updateImage(id: string, imageData: ImageDocument) {
    return await Image.findByIdAndUpdate(id, imageData, {
      new: true,
    });
  }
}
