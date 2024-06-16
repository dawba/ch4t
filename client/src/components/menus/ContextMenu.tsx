import ChatListView from './ChatListView.tsx';
import SettingsView from './SettingsView.tsx';
import AddChatView from './AddChatView.tsx';
import { MenuItem,Chat } from '../../types/types.ts'; 
import useSplitChats from '../../hooks/useSplitChats.ts';

type ContextMenuProps = {
  activeMenuItem: MenuItem;
  chats: Chat[]
};

const ContextMenu = ({ activeMenuItem,chats }: ContextMenuProps) => {

  const {directChats,groupChats} = useSplitChats(chats);

  return (
    <div className="w-[20vw] min-w-[300px] h-full bg-primary-gray mr-1">
      {activeMenuItem === 'DirectChats' && (
        <ChatListView chats={directChats} />
      )}
      {activeMenuItem === 'GroupChats' && (
        <ChatListView chats={groupChats} />
      )}
      {activeMenuItem === 'AddChat' && <AddChatView />}
      {activeMenuItem === 'Settings' && <SettingsView />}
    </div>
  );
};

export default ContextMenu;
