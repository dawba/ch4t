import { useState } from 'react';
import { ID } from '../types/types';
import ChatRepository from '../api/ChatRepository.ts';
import UserRepository from '../api/UserRepository.ts';
import {User} from "../types/types";
import {checkEmptyObject} from "../utils/checkEmptyObject.ts";



const useAddChat = (currentUserId: ID, currentUserUsername: string) => {
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
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



      const response = await UserRepository.getUserByUsername(username);
      if (checkEmptyObject(response.data) ) {
        setErrorMessage('User not found');
        return false;
      }
      const user : User  = response.data;

      setAddedUsers((prevUsers) => [
        ...prevUsers,
        { id: user.id, username: user.username },
      ]);
      setErrorMessage('');
      return true;

  };

  // might be better approach to send the pfp in parallel with the chat creation
  const createChat = async (chatName: string, users: User[], pfp: string) => {
    // log it for now to get rid of unused params warning
    console.log(chatName, users, pfp);

    if (users.length == 0) {
      setErrorMessage('Cant create a chat with no users');
      return null;
    }

    try {
      const userIds = users.map((user) => user.id);
      userIds.push(currentUserId);
      const createdAt = new Date().toISOString();

      const data = await ChatRepository.createChat(userIds, createdAt);

      setErrorMessage('');
      setAddedUsers([]);
      return data;
    } catch (error) {
      setErrorMessage('Failed to create chat');
      return null;
    }
  };

  return {
    addedUsers,
    errorMessage,
    addUserToChat,
    createChat,
  };
};

export default useAddChat;
