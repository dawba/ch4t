import ChatList, { Mock1, Mock2, Mock3 } from '../components/chat/ChatList.tsx';
import SettingsView from './SettingsView.tsx';
import AddChatView from './AddChatView.tsx';
import { MenuItem } from '../types/types.ts';

type ContextMenuProps = {
  activeMenuItem: MenuItem;
};

const ContextMenu = ({ activeMenuItem }: ContextMenuProps) => {
  return (
    <div className="w-[20vw] h-full bg-primary-gray mr-1">
      {activeMenuItem === 'DirectChats' && (
        <ChatList chats={[Mock1, Mock2, Mock3]} />
      )}
      {activeMenuItem === 'GroupChats' && (
        <ChatList chats={[Mock1, Mock2, Mock3]} />
      )}
      {activeMenuItem === 'AddChat' && <AddChatView />}
      {activeMenuItem === 'Settings' && <SettingsView />}
    </div>
  );
};

export default ContextMenu;
