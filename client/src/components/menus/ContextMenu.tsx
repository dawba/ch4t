import ChatListView from './ChatListView.tsx';
import SettingsView from './SettingsView.tsx';
import AddChatView from './AddChatView.tsx';
import { Chat, MenuItem } from '../../types/types.ts';

type ContextMenuProps = {
  activeMenuItem: MenuItem;
  setSelectedChat: (c: Chat | null) => void;
  chats: Chat[];
  setChats: (c: Chat[]) => void;
};

const ContextMenu = ({
  activeMenuItem,
  setSelectedChat,
  chats,
  setChats,
}: ContextMenuProps) => {
  const privateChats = chats.filter((c: Chat) => c.users.length === 2);
  const groupChats = chats.filter((c: Chat) => c.users.length !== 2);

  const onChatAdded = (newChat: Chat) => {
    setChats([...chats, newChat]);
  };

  return (
    <div className="w-[20vw] min-w-[300px] h-full bg-primary-gray mr-1">
      {activeMenuItem === 'DirectChats' && (
        <ChatListView chats={privateChats} setSelectedChat={setSelectedChat} />
      )}
      {activeMenuItem === 'GroupChats' && (
        <ChatListView chats={groupChats} setSelectedChat={setSelectedChat} />
      )}
      {activeMenuItem === 'AddChat' && (
        <AddChatView onChatAdded={onChatAdded} />
      )}
      {activeMenuItem === 'Settings' && <SettingsView />}
    </div>
  );
};

export default ContextMenu;
