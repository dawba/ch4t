import { ID } from '../types/types.ts';

const BASE_URL = 'http://localhost:5050/api/image';

const IMAGE_API_ENDPOINTS = {
  POST: {
    CREATE_FOR_CHAT: (chatId: ID) => `${BASE_URL}/chat/${chatId}`,
    CREATE_FOR_USER: (userId: ID) => `${BASE_URL}/user/${userId}`,
  },
  GET: {
    BY_ID: (id: ID) => `${BASE_URL}/${id}`,
  },
  PUT: {
    UPDATE: (id: ID) => `${BASE_URL}/${id}`,
  },
};

export default IMAGE_API_ENDPOINTS;
