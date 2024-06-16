import { useContext, useState } from 'react';
import { ChatData, ID, PartialUser, UserData } from '../types/types';
import ChatRepository from '../api/ChatRepository.ts';
import UserRepository from '../api/UserRepository.ts';
import { checkEmptyObject } from '../utils/checkEmptyObject.ts';
import { UserContext } from '../components/providers/UserProvider.tsx';
import chatRepository from '../api/ChatRepository.ts';

const useAddUsersToChat = ({ chatId }: { chatId: ID }) => {
  const [addedUsers, setAddedUsers] = useState<UserData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const userContext = useContext(UserContext);

  const fetchCurrentUserList = async (): Promise<PartialUser[]> => {
    const response = await chatRepository.getChatById(chatId);
    const data = response.data;
    if (checkEmptyObject(data)) {
      setErrorMessage('Did not find chat');
      return [];
    }
    const chat = data as ChatData;
    return chat.users;
  };
  const currentUserUsername = userContext.username;
  const addUserToChat = async (username: string) => {
    const users = await fetchCurrentUserList();
    console.log('users', users);
    console.log('ddddd', addedUsers);
    if (
      addedUsers.some((user) => user.username === username) ||
      users.some((user) => user.username === username)
    ) {
      setErrorMessage('User already added to the chat');
      return false;
    }

    if (currentUserUsername === username) {
      setErrorMessage('You dont need to add yourself to the chat');
      return false;
    }

    const { data } = await UserRepository.getUserByUsername(username);
    if (checkEmptyObject(data)) {
      setErrorMessage('User not found');
      return false;
    }

    const user = data as UserData;

    setAddedUsers((prevUsers) => [...prevUsers, user]);
    setErrorMessage('');
    return true;
  };

  const removeUserFromChat = (username: string) => {
    setAddedUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  };

  const deleteAllAddedUsers = () => {
    setAddedUsers([]);
  };
  // might be better approach to send the pfp in parallel with the chat creation
  const updateChat = async (users: UserData[]) => {
    // log it for now to get rid of unused params warning
    if (users.length == 0) {
      setErrorMessage('Cant create a chat with no users');
      return null;
    }

    const partialUsers: PartialUser[] = users.map((user) => ({
      username: user.username,
      userId: user._id,
    }));
    const response = await chatRepository.getChatById(chatId);
    const data = response.data;
    if (checkEmptyObject(data)) {
      setErrorMessage('Did not find chat');
      return;
    }
    const chat = data as ChatData;

    const newChatData = { ...chat, users: [...chat.users, ...partialUsers] };

    const updatedChat = await ChatRepository.updateChat(chatId, newChatData);

    setErrorMessage('');
    setAddedUsers([]);
    return updatedChat;
  };

  return {
    addedUsers,
    errorMessage,
    addUserToChat,
    updateChat,
    removeUserFromChat,
    deleteAllAddedUsers,
  };
};

export default useAddUsersToChat;
