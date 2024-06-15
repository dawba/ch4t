import { ApiResponse, ID } from '../types/types.ts';
import UserApiPaths from './UserApiPaths.ts';
import { fetchData } from './fetchData.ts';

interface IUserRepository {
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<ApiResponse>;
  login: (email: string, password: string) => Promise<ApiResponse>;
  logout: (token: string) => Promise<ApiResponse>;
  getUserByUsername: (username: string) => Promise<ApiResponse>;
  getUserById: (id: ID) => Promise<ApiResponse>;
  getAllUsers: () => Promise<ApiResponse>;
  updateUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<ApiResponse>;
  deleteUser: () => Promise<ApiResponse>;
}

const UserRepository: IUserRepository = {
  register: async (email, username, password) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    };

    return await fetchData(UserApiPaths.POST.REGISTER, options);
  },

  login: async (email, password) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    };

    return await fetchData(UserApiPaths.POST.LOGIN, options);
  },

  logout: async () => {
    const options = {
      method: 'POST',
    };

    return await fetchData(UserApiPaths.POST.LOGOUT, options);
  },

  getUserByUsername: async (username) => {
    return await fetchData(UserApiPaths.GET.BY_USERNAME(username), {
      method: 'GET',
    });
  },

  getUserById: async (id) => {
    return await fetchData(UserApiPaths.GET.BY_ID(id), {
      method: 'GET',
    });
  },

  getAllUsers: async () => {
    return await fetchData(UserApiPaths.GET.ALL, {
      method: 'GET',
    });
  },

  updateUser: async (email, username, password) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ email, username, password }),
    };

    return await fetchData(UserApiPaths.PUT.UPDATE, options);
  },

  deleteUser: async () => {
    return await fetchData(UserApiPaths.DELETE.DELETE, {
      method: 'DELETE',
    });
  },
};

export default UserRepository;
