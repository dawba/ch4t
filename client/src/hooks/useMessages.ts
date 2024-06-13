import { useEffect, useState } from 'react';
import { ChatViewProps } from '../components/chat/ChatView.tsx';
import { MessageDataAdapter } from '../adapters/implementation/MessageDataAdapter.ts';
import { MessageTileProps } from '../types/types.ts';

const useMessages = ({ chatId, currentUser, users }: ChatViewProps) => {
  const API_URL = `http://localhost:5050/api/message/chat/${chatId}`;
  const [messages, setMessages] = useState<MessageTileProps[]>([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const messages = MessageDataAdapter.getMessages(
          data,
          currentUser,
          users
        );
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [API_URL, currentUser, users]);

  return { messages, setMessages };
};

export default useMessages;
