import { ID } from '../types/types.ts';

const BASE_URL = 'http://localhost:5050/api/user';

const USER_API_ENDPOINTS = {
  POST: {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    LOGOUT: `${BASE_URL}/logout`,
  },
  GET: {
    ALL: `${BASE_URL}/all`,
    BY_ID: (id: ID) => `${BASE_URL}/id/${id}`,
    BY_USERNAME: (username: string) => `${BASE_URL}/username/${username}`,
    BY_EMAIL: (email: string) => `${BASE_URL}/email/${email}`,
  },
  PUT: {
    UPDATE: (id: ID) => `${BASE_URL}/${id}`,
  },
  DELETE: {
    DELETE: (id: ID) => `${BASE_URL}/${id}`,
  },
};

export default USER_API_ENDPOINTS;
