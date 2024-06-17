import { useEffect, useState } from 'react';
import ContextMenu from '../components/menus/ContextMenu.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import useChats from '../hooks/useChats.ts';
import ChatView from '../components/chat/ChatView.tsx';
import {
  MenuItem,
  MessageData,
  PartialUser,
  UserData,
} from '../types/types.ts';
import { useUserContext } from '../components/providers/UserProvider.tsx';
import { useNavigate } from 'react-router-dom';
import UserRepository from '../api/UserRepository.ts';
import { checkEmptyObject } from '../utils/checkEmptyObject.ts';
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage.ts';
import { io } from 'socket.io-client';

const MainPage = () => {
  const {
    userId,
    username,
    email,
    setUserId,
    setUsername,
    setEmail,
    setUserChats,
  } = useUserContext();

  const socket = io('http://localhost:5050');

  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');
  const { chats, setChats, selectedChat, setSelectedChat } = useChats(userId);
  const navigate = useNavigate();

  useEffect(() => {
    const { lsUsername, lsEmail, lsUserId, lsToken, lsChats } =
      getUserDataFromLocalStorage();

    if (!lsUserId || !lsToken || !lsUsername || !lsEmail || lsChats === null) {
      return navigate('/login');
    }

    const fetchRememberedUser = async () => {
      const rememberedUser = await UserRepository.getUserById(lsUserId);
      const userData = rememberedUser.data as UserData;
      if (checkEmptyObject(userData)) {
        return navigate('/login');
      }

      setUsername(userData.username);
      setEmail(userData.email);
      setUserId(userData._id);
      setUserChats(userData.chats);
      localStorage.setItem('currentUsername', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('currentUserId', JSON.stringify(userData?._id));
      localStorage.setItem('token', lsToken);
      localStorage.setItem('chats', JSON.stringify(userData.chats));
    };

    if (!username || !email || !userId) {
      fetchRememberedUser();
    }
  }, []);

  useEffect(() => {
    for (const chat of chats) {
      socket.emit('joinChat', chat.id);
    }

    socket.on('receiveMessage', (message: MessageData) => {
      const chat = chats.find((c) => c.id === message.chat);

      if (!chat) {
        return console.error('Chat not found');
      }

      const chatUsers = chat.users;
      const sender = chatUsers.find(
        (user) => user.userId === message.sender
      ) as PartialUser;
      const senderName = sender.username;

      const mess = {
        id: message._id,
        message: message.content,
        senderId: message.sender,
        senderName: senderName,
        timeSent: message.createdAt.toString(),
        messageSentByUser: message.sender === userId,
      };

      if (selectedChat && selectedChat?.id === message.chat) {
        setSelectedChat((prevSelectedChat) => {
          if (!prevSelectedChat) return null;

          return {
            ...prevSelectedChat,
            messages: [...prevSelectedChat.messages, mess],
            lastMessage: mess.message,
          };
        });
      }

      setChats((prevChats) => {
        return prevChats.map((stateChat) => {
          if (stateChat.id === message.chat) {
            return {
              ...stateChat,
              messages: [...stateChat.messages, mess],
              lastMessage: mess.message,
            };
          }
          return stateChat;
        });
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  });

  return (
    <div className="h-full w-full flex flex-row items-start">
      <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem} />
      <ContextMenu
        activeMenuItem={activeItem}
        setSelectedChat={setSelectedChat}
        chats={chats}
        setChats={setChats}
      />
      {selectedChat !== null ? (
        <ChatView
          chat={selectedChat}
          // @ts-ignore
          socket={socket}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <h4 className="text-center">
            Create a new chat
            <br />
            or select one from the list!
          </h4>
        </div>
      )}
    </div>
  );
};

export default MainPage;
