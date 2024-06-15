import { ID } from '../types/types.ts';

const BASE_URL = 'http://localhost:5050/api/message';

const MESSAGE_API_ENDPOINTS = {
  POST: {
    CREATE: `${BASE_URL}/create`,
  },
  GET: {
    ALL_USER: (id: ID) => `${BASE_URL}/user/${id}/all`,
    BY_ID: (id: ID) => `${BASE_URL}/id/${id}`,
    ALL_CHAT: (id: ID) => `${BASE_URL}/chat/${id}`,
  },
  PUT: {
    UPDATE: (id: ID) => `${BASE_URL}/${id}`,
  },
  DELETE: {
    DELETE: (id: ID) => `${BASE_URL}/${id}`,
  },
};

export default MESSAGE_API_ENDPOINTS;
