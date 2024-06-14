import { useState, useContext } from 'react';
import { ID } from '../types/types';
import { UserContext } from '../components/providers/UserProvider.tsx';
interface User {
  id: ID;
  username: string;
}

const useAddChat = () => {
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const userContext = useContext(UserContext);

  if (!userContext) {
    setErrorMessage('User context is not available');
    return null;
  }

  const currentUserId = userContext.id;
  const currentUserUsername = userContext.username;

  if (!currentUserId) {
    setErrorMessage('Current user ID is not available');
    return null;
  }

  if (!currentUserUsername) {
    setErrorMessage('Current user Username is not available');
    return null;
  }

  const addUserToChat = async (username: string) => {
    if (addedUsers.some((user) => user.username === username)) {
      setErrorMessage('User already added to the chat');
      return false;
    }

    if (currentUserUsername === username) {
      setErrorMessage('You dont need to add yourself to the chat');
      return false;
    }

    try {
      const API_URL = `http://localhost:5050/api/user/username/${username}`;
      const response = await fetch(API_URL);
      const user = await response.json();
      if (user == null) {
        setErrorMessage('User not found');
        return false;
      }

      setAddedUsers((prevUsers) => [
        ...prevUsers,
        { id: user._id, username: user.username },
      ]);
      setErrorMessage('');
      return true;
    } catch (error) {
      setErrorMessage('User not found');
      return false;
    }
  };

  const createChat = async (chatName: string, users: User[], pfp: string) => {
    if (users.length == 0) {
      setErrorMessage('Cant create a chat with no users');
      return null;
    }
    try {
      const userIds = users.map((user) => user.id);
      userIds.push(currentUserId);
      const createdAt = new Date().toISOString();
      const API_URL = `http://localhost:5050/api/chat/`;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          users: userIds,
          createdAt,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create chat');
      }
      const data = await response.json();
      setErrorMessage('');
      setAddedUsers([]);
      return data;
    } catch (error) {
      setErrorMessage('Failed to create chat');
      return null;
    }
  };

  return { addUserToChat, createChat, addedUsers, errorMessage };
};

export default useAddChat;
