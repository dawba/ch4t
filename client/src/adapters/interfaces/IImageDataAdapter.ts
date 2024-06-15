import { ImageData, Image } from '../../types/types.ts';

export interface IImageDataAdapter {
  getImages: (imageData: ImageData) => Image;
}
