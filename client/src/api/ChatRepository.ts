import { ApiResponse, ChatData, ID } from '../types/types.ts';
import ChatApiPaths from './ChatApiPaths.ts';
import { fetchData } from './fetchData.ts';

interface IChatRepository {
  createChat: (users: ID[], createdAt: string) => Promise<ApiResponse>;
  getAllChats: () => Promise<ApiResponse>;
  getChatById: (id: ID) => Promise<ApiResponse>;
  getChatsByUserId: (id: ID) => Promise<ApiResponse>;
  updateChat: (id: ID, chat: ChatData) => Promise<ApiResponse>;
  deleteChat: (id: ID) => Promise<ApiResponse>;
  removeUserFromChat: (chatId: ID, userId: ID) => Promise<ApiResponse>;
}

const ChatRepository: IChatRepository = {
  createChat: async (users, createdAt) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ users, createdAt }),
    };

    return await fetchData(ChatApiPaths.POST.CREATE, options);
  },

  getAllChats: async () => {
    return await fetchData(ChatApiPaths.GET.ALL, {
      method: 'GET',
    });
  },

  getChatById: async (id) => {
    return await fetchData(ChatApiPaths.GET.BY_ID(id), {
      method: 'GET',
    });
  },

  getChatsByUserId: async (id) => {
    return await fetchData(ChatApiPaths.GET.ALL_USER_CHATS(id), {
      method: 'GET',
    });
  },

  updateChat: async (id, chat) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(chat),
    };

    return await fetchData(ChatApiPaths.PUT.UPDATE(id), options);
  },

  deleteChat: async (id) => {
    return await fetchData(ChatApiPaths.DELETE.DELETE(id), {
      method: 'DELETE',
    });
  },

  removeUserFromChat: async (chatId, userId) => {
    return await fetchData(ChatApiPaths.DELETE.REMOVE_USER(chatId, userId), {
      method: 'DELETE',
    });
  },
};

export default ChatRepository;
