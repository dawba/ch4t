import { useEffect, useState } from 'react';
import ContextMenu from '../components/menus/ContextMenu.tsx';
// import ChatView from '../components/chat/ChatView.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import { ID, MenuItem } from '../types/types.ts';
import { useUserContext } from '../components/providers/UserProvider.tsx';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { userId, setUserId } = useUserContext();
  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');
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
