import { ApiResponse, ID, NewMessageData } from '../types/types.ts';
import { Fetching } from './fetchData.ts';
import MESSAGE_API_ENDPOINTS from './MessageApiPaths.ts';

interface IMessageRepository {
  createMessage: (message: NewMessageData) => Promise<ApiResponse>;
  getAllMessagesForUser: (id: ID) => Promise<ApiResponse>;
  getMessageById: (id: ID) => Promise<ApiResponse>;
  getAllMessagesForChat: (id: ID) => Promise<ApiResponse>;
  updateMessage: (id: ID) => Promise<ApiResponse>;
  deleteMessage: (id: ID) => Promise<ApiResponse>;
}

const MessageRepository: IMessageRepository = {
  createMessage: async (message): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.POST.CREATE, options);
  },
  getAllMessagesForUser: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.GET.ALL_USER(id), options);
  },
  getMessageById: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.GET.BY_ID(id), options);
  },
  getAllMessagesForChat: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.GET.ALL_CHAT(id), options);
  },
  updateMessage: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'PUT',
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.PUT.UPDATE(id), options);
  },
  deleteMessage: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'DELETE',
    };

    return Fetching.withAuth(MESSAGE_API_ENDPOINTS.DELETE.DELETE(id), options);
  },
};

export default MessageRepository;
