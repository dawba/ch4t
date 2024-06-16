import { useEffect, useState} from 'react';
import { useEffect, useState } from 'react';
import ContextMenu from '../components/menus/ContextMenu.tsx';
// import ChatView from '../components/chat/ChatView.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import {
  UserProvider,
} from '../components/providers/UserProvider.tsx';
import useChats from '../hooks/useChats.ts';
import ChatView from '../components/chat/ChatView.tsx';
import { ID, MenuItem } from '../types/types.ts';
import { useUserContext } from '../components/providers/UserProvider.tsx';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { userId, setUserId } = useUserContext();
  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');
  const { chats, setChats, selectedChat, setSelectedChat } = useChats(
    userId
  );
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('currentUserId') as unknown as ID;
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return navigate('/login');
    }

    setUserId(userId);
  }, [userId]);

  return (
    <UserProvider>
      <div className="h-full w-full flex flex-row items-start">
        <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem} />
        <ContextMenu
          activeMenuItem={activeItem}
          setSelectedChat={setSelectedChat}
          chats={chats}
          setChats={setChats}
        />
        {selectedChat !== null ? (
          <ChatView chat={selectedChat} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h4 className="">
              Create a new chat
              <br />
              or select one from the list!
            </h4>
          </div>
        )}
      </div>
    </UserProvider>
  );
};

export default MainPage;
