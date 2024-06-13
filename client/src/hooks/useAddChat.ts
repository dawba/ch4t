import { useState } from 'react';

interface User {
  id: string;
  username: string;
}

const useAddChat = () => {
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const addUserToChat = async (username: string) => {
    if (!addedUsers.some((user) => user.username === username)) {
      try {
        const API_URL = `http://localhost:5050/api/user/username/${username}`;

        const response = await fetch(API_URL);
        const user = await response.json();
        if (user) {
          setAddedUsers((prevUsers) => [
            ...prevUsers,
            { id: user._id, username: user.username },
          ]);
          setErrorMessage('');
          return true;
        }
        if (user == null) {
          throw new Error('User not found');
        }
      } catch (error) {
        setErrorMessage('User not found');
        return false;
      }
    } 
    else {
      setErrorMessage('User already added to the chat');
    }
  };

  const createChat = async (chatName: string, users: User[], pfp: string) => {
    try {
      const userIds = users.map((user) => user.id);
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
      return data;
    } catch (error) {
      setErrorMessage('Failed to create chat');
      return null;
    }
  };

  return { addUserToChat, createChat, addedUsers, errorMessage };
};

export default useAddChat;
