import { getIdFromLocalStorage } from './getIdFromLocalStorage.ts';

export const getUserDataFromLocalStorage = () => {
  const lsUsername = localStorage.getItem('currentUsername');
  const lsEmail = localStorage.getItem('email');
  const lsUserId = getIdFromLocalStorage();
  const lsToken = localStorage.getItem('token');
  const lsChats = localStorage.getItem('chats');
  return { lsUsername, lsEmail, lsUserId, lsToken, lsChats };
};
