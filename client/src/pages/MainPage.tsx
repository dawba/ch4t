import { useState } from 'react';
import ContextMenu from '../components/menus/ContextMenu.tsx';
// import ChatView from '../components/chat/ChatView.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import { MenuItem } from '../types/types.ts';
import { UserProvider } from '../components/providers/UserProvider.tsx';

const MainPage = () => {
  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');

  return (
    <UserProvider>
      <div className="h-full w-full flex flex-row items-start">
        <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem} />
        <ContextMenu activeMenuItem={activeItem} chats={[]} />
        {/*<ChatView users={[]} chatId={null} currentUser={null} />*/}
      </div>
    </UserProvider>
  );
};

export default MainPage;
