import { ID } from '../types/types.ts';

const BASE_URL = 'http://localhost:5050/api/chat';

const CHAT_API_ENDPOINTS = {
  POST: {
    CREATE: `${BASE_URL}/create`,
  },
  GET: {
    ALL: `${BASE_URL}/all`,
    BY_ID: (id: ID) => `${BASE_URL}/id/${id}`,
    ALL_USER_CHATS: (id: ID) => `${BASE_URL}/all/user/${id}`,
  },
  PUT: {
    UPDATE: (id: ID) => `${BASE_URL}/update/${id}`,
  },
  DELETE: {
    DELETE: (id: ID) => `${BASE_URL}/${id}`,
    REMOVE_USER: (chatId: ID, userId: ID) =>
      `${BASE_URL}/${chatId}/remove/user/${userId}`,
  },
};

export default CHAT_API_ENDPOINTS;
