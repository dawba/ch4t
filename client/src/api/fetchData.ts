import { ApiResponse } from '../types/types.ts';

export const fetchData = async (
  url: string,
  options: RequestInit
): Promise<ApiResponse> => {
  try {
    console.log('Fetching data from:', url);
    console.log('Options:', options.body);
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
};
