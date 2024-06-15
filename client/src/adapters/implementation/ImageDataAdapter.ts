import { IImageDataAdapter } from '../interfaces/IImageDataAdapter.ts';
import { ImageData, Image } from '../../types/types.ts';

export const ImageDataAdapter: IImageDataAdapter = {
  getImages: (imageData: ImageData): Image => {
    const base64String = Buffer.from(imageData.data).toString('base64');
    const imageUrl = `data:${imageData.contentType};base64,${base64String}`;

    return {
      id: imageData._id,
      url: imageUrl,
      name: imageData.name,
      contentType: imageData.contentType,
      createdAt: imageData.createdAt,
    };
  },
};
