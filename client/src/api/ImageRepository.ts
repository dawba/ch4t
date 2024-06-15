import { ApiResponse, ID } from '../types/types.ts';
import ImageApiPaths from './ImageApiPaths.ts';
import { fetchData } from './fetchData.ts';

interface IImageRepository {
  getImageById: (id: ID) => Promise<ApiResponse>;
  createImageForChat: (chatId: ID, imageData: string) => Promise<ApiResponse>;
  createImageForUser: (userId: ID, imageData: string) => Promise<ApiResponse>;
  updateImage: (id: ID, imageData: string) => Promise<ApiResponse>;
}

const ImageRepository: IImageRepository = {
  getImageById: async (id) => {
    return await fetchData(ImageApiPaths.GET.BY_ID(id), {
      method: 'GET',
    });
  },

  createImageForChat: async (chatId, imageData) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(imageData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await fetchData(ImageApiPaths.POST.CREATE_FOR_CHAT(chatId), options);
  },

  createImageForUser: async (userId, imageData) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(imageData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await fetchData(ImageApiPaths.POST.CREATE_FOR_USER(userId), options);
  },

  updateImage: async (id, imageData) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(imageData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await fetchData(ImageApiPaths.PUT.UPDATE(id), options);
  },
};

export default ImageRepository;
