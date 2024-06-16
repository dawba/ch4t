import { ApiResponse, ID } from '../types/types.ts';
import UserApiPaths from './UserApiPaths.ts';
import { Fetching } from './fetchData.ts';

interface IUserRepository {
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<ApiResponse>;
  login: (username: string, password: string) => Promise<ApiResponse>;
  logout: (token: string) => Promise<ApiResponse>;
  getUserByUsername: (username: string) => Promise<ApiResponse>;
  getUserById: (id: ID) => Promise<ApiResponse>;
  getUserByEmail: (email: string) => Promise<ApiResponse>;
  getAllUsers: () => Promise<ApiResponse>;
  updateUser: (
    id: ID,
    email: string,
    username: string,
    password: string
  ) => Promise<ApiResponse>;
  deleteUser: (id: ID) => Promise<ApiResponse>;
}

const UserRepository: IUserRepository = {
  register: async (email, username, password) => {
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    };

    return await Fetching.fetchData(UserApiPaths.POST.REGISTER, options);
  },

  login: async (username, password) => {
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    return await Fetching.fetchData(UserApiPaths.POST.LOGIN, options);
  },

  logout: async () => {
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
    };

    return await Fetching.withAuth(UserApiPaths.POST.LOGOUT, options);
  },

  getUserByUsername: async (username) => {
    return await Fetching.fetchData(UserApiPaths.GET.BY_USERNAME(username), {
      method: 'GET',
    });
  },

  getUserById: async (id) => {
    return await Fetching.withAuth(UserApiPaths.GET.BY_ID(id), {
      method: 'GET',
    });
  },

  getUserByEmail: async (email) => {
    return await Fetching.fetchData(UserApiPaths.GET.BY_EMAIL(email), {
      method: 'GET',
    });
  },

  getAllUsers: async () => {
    return await Fetching.withAuth(UserApiPaths.GET.ALL, {
      method: 'GET',
    });
  },

  updateUser: async (id, email, username, password) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ email, username, password }),
    };

    return await Fetching.withAuth(UserApiPaths.PUT.UPDATE(id), options);
  },

  deleteUser: async (id) => {
    return await Fetching.withAuth(UserApiPaths.DELETE.DELETE(id), {
      method: 'DELETE',
    });
  },
};

export default UserRepository;
