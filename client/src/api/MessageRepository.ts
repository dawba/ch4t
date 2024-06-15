import { ApiResponse, ID, Message } from '../types/types.ts';
import { fetchData } from './fetchData.ts';
import MESSAGE_API_ENDPOINTS from './MessageApiPaths.ts';

interface IMessageRepository {
  createMessage: (message: Message) => Promise<ApiResponse>;
  getAllMessagesForUser: (id: ID) => Promise<ApiResponse>;
  getMessageById: (id: ID) => Promise<ApiResponse>;
  getAllMessagesForChat: (id: ID) => Promise<ApiResponse>;
  updateMessage: (id: ID) => Promise<ApiResponse>;
  deleteMessage: (id: ID) => Promise<ApiResponse>;
}

const MessageRepository: IMessageRepository = {
  createMessage: async (message: Message): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    };

    return fetchData(MESSAGE_API_ENDPOINTS.POST.CREATE, options);
  },
  getAllMessagesForUser: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return fetchData(MESSAGE_API_ENDPOINTS.GET.ALL_USER(id), options);
  },
  getMessageById: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return fetchData(MESSAGE_API_ENDPOINTS.GET.BY_ID(id), options);
  },
  getAllMessagesForChat: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'GET',
    };

    return fetchData(MESSAGE_API_ENDPOINTS.GET.ALL_CHAT(id), options);
  },
  updateMessage: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'PUT',
    };

    return fetchData(MESSAGE_API_ENDPOINTS.PUT.UPDATE(id), options);
  },
  deleteMessage: async (id: ID): Promise<ApiResponse> => {
    const options: RequestInit = {
      method: 'DELETE',
    };

    return fetchData(MESSAGE_API_ENDPOINTS.DELETE.DELETE(id), options);
  },
};

export default MessageRepository;
