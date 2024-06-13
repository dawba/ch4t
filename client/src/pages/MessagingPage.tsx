import { useState } from 'react';
import ContextMenu from '../components/ContextMenu.tsx';
import { UserProvider } from '../components/UserProvider.tsx';
import NavigationMenu from '../components/navigation/NavigationMenu.tsx';

import { MenuItem } from '../types/types.ts';

const MessagingPage = () => {
  const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');

  return (
    <UserProvider>
      <div className="h-full w-full flex flex-row items-start">
        <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem} />
        <ContextMenu activeMenuItem={activeItem} />
      </div>
    </UserProvider>
  );
};

export default MessagingPage;
