import ChatListView, { Mock1, Mock2, Mock3 } from './ChatListView.tsx';
import SettingsView from './SettingsView.tsx';
import AddChatView from './AddChatView.tsx';
import { MenuItem } from '../../types/types.ts';

type ContextMenuProps = {
  activeMenuItem: MenuItem;
};

const ContextMenu = ({ activeMenuItem }: ContextMenuProps) => {
  return (
    <div className="w-[20vw] min-w-[300px] h-full bg-primary-gray mr-1">
      {activeMenuItem === 'DirectChats' && (
        <ChatListView chats={[Mock1, Mock2, Mock3]} />
      )}
      {activeMenuItem === 'GroupChats' && (
        <ChatListView chats={[Mock1, Mock2, Mock3]} />
      )}
      {activeMenuItem === 'AddChat' && <AddChatView />}
      {activeMenuItem === 'Settings' && <SettingsView />}
    </div>
  );
};

export default ContextMenu;
