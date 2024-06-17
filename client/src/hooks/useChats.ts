import { useEffect, useState } from 'react';
import ChatDataAdapter from '../adapters/implementation/ChatDataAdapter.ts';
import { Chat, ChatData, ID } from '../types/types.ts';
import ChatRepository from '../api/ChatRepository.ts';

const useChats = (userId: ID | null) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserChats = async () => {
      try {
        const chatsResponse = await ChatRepository.getChatsByUserId(userId);
        const chatsResponseData = chatsResponse.data;
        const chats = await ChatDataAdapter.getChats(
          chatsResponseData as ChatData[],
          userId
        );
        setChats(chats);

        console.log(chats);
      } catch (error) {
        console.error('Error fetching user chats:', error);
      }
    };

    fetchUserChats();
  }, [userId]);

  return {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
  };
};

export default useChats;
