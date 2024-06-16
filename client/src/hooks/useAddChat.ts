import { useState } from 'react';
import { ID, PartialUser, UserData } from '../types/types';
import ChatRepository from '../api/ChatRepository.ts';
import UserRepository from '../api/UserRepository.ts';
import { checkEmptyObject } from '../utils/checkEmptyObject.ts';

const useAddChat = (currentUserId: ID, currentUserUsername: string) => {
  const [addedUsers, setAddedUsers] = useState<UserData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const addUserToChat = async (username: string) => {
    if (addedUsers.some((user) => user.username === username)) {
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

  // might be better approach to send the pfp in parallel with the chat creation
  const createChat = async (
    chatName: string,
    users: UserData[],
    pfp: string
  ) => {
    // log it for now to get rid of unused params warning
    console.log(chatName, users, pfp);
    if (users.length == 0) {
      setErrorMessage('Cant create a chat with no users');
      return null;
    }

    const partialUsers = users.map(
      (user) => ({ userId: user._id, username: user.username }) as PartialUser
    );
    partialUsers.push({
      userId: currentUserId,
      username: currentUserUsername,
    } as PartialUser);
    const createdAt = new Date().toISOString();

    const data = await ChatRepository.createChat(
      partialUsers,
      chatName,
      createdAt
    );

    setErrorMessage('');
    setAddedUsers([]);
    return data;
  };

  return {
    addedUsers,
    errorMessage,
    addUserToChat,
    createChat,
    removeUserFromChat,
  };
};

export default useAddChat;
