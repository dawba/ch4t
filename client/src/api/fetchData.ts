import { ApiResponse } from '../types/types.ts';

export const Fetching = {
  withAuth: async (
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse> => {
    const token = localStorage.getItem('authToken');
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return await Fetching.fetchData(url, options);
  },

  fetchData: async (
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse> => {
    try {
      console.log('Fetching data from:', url);
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        return { message: 'Success', data };
      } else {
        const errorData = await response.json();
        return {
          message: errorData.message || 'Network ApiResponse was not ok',
          data: {},
        };
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return { message: 'Unknown fetch error', data: {} };
    }
  },
};
