import { useEffect, useState } from 'react';
import ContextMenu from '../components/menus/ContextMenu.tsx';
// import ChatView from '../components/chat/ChatView.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import { MenuItem, UserData } from '../types/types.ts';
import { useUserContext } from '../components/providers/UserProvider.tsx';
import { useNavigate } from 'react-router-dom';
import UserRepository from '../api/UserRepository.ts';
import { checkEmptyObject } from '../utils/checkEmptyObject.ts';
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage.ts';

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

  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');
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

  return (
    <>
      {userId && (
        <div className="h-full w-full flex flex-row items-start">
          <NavigationMenu
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <ContextMenu activeMenuItem={activeItem} />
          {/*<ChatView users={[]} chatId={null} currentUser={null} />*/}
        </div>
      )}
    </>
  );
};

export default MainPage;
