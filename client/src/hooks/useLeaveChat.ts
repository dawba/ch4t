import { useState, useContext } from 'react';
import { ID } from '../types/types.ts';
import { UserContext } from '../components/providers/UserProvider.tsx';
import ChatRepository from '../api/ChatRepository.ts';
const useLeaveChat = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const userContext = useContext(UserContext);
  const userId = userContext.userId!!;

  const startConfirming = () => {
    setIsConfirming(true);
  };

  const cancelLeave = () => {
    setIsConfirming(false);
  };

  const confirmLeave = async (chatId: ID) => {
    await ChatRepository.removeUserFromChat(chatId, userId);
    setIsConfirming(false);
  };

  return {
    isConfirming,
    startConfirming,
    cancelLeave,
    confirmLeave,
  };
};

export default useLeaveChat;
