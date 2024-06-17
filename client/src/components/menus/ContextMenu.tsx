import ChatListView from './ChatListView.tsx';
import SettingsView from './SettingsView.tsx';
import AddChatView from './AddChatView.tsx';
import { Chat, MenuItem } from '../../types/types.ts';
import { Dispatch, SetStateAction } from 'react';

type ContextMenuProps = {
  activeMenuItem: MenuItem;
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
};

const ContextMenu = ({
  activeMenuItem,
  setSelectedChat,
  chats,
  setChats,
}: ContextMenuProps) => {
  console.log(chats);

  const directChats = chats.filter((c: Chat) => c.users.length === 2);
  const groupChats = chats.filter((c: Chat) => c.users.length !== 2);

  const onChatAdded = (newChat: Chat) => {
    setChats([...chats, newChat]);
  };

  return (
    <div className="w-[20vw] min-w-[300px] h-full bg-primary-gray mr-1">
      {activeMenuItem === 'DirectChats' && (
        <ChatListView chats={directChats} setSelectedChat={setSelectedChat} />
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
