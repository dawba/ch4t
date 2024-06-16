import { useMemo } from 'react';
import { Chat } from '../types/types';

const useSplitChats = (chats: Chat[]) => {
  const { directChats, groupChats } = useMemo(() => {
    const directChats = chats.filter((chat) => chat.users.length == 2);
    const groupChats = chats.filter((chat) => chat.users.length >= 2);
    return { directChats, groupChats };
  }, [chats]);

  return { directChats, groupChats };
}; 

export default useSplitChats;
