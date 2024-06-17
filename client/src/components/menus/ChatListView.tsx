import ChatTile from './ChatTile.tsx';
import { Chat } from '../../types/types.ts';
import Search from '../customs/Search.tsx';

import styles from '../../styles/ChatsListView.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

export type ChatListProps = {
  chats: Chat[];
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
};

const ChatListView = ({ chats, setSelectedChat }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.groupChatsList}>
      {filteredChats.map((chat: Chat) => (
        <ChatTile
          key={chat?.id?.toString()}
          chat={chat}
          setSelectedChat={setSelectedChat}
        />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    </div>
  );
};

export default ChatListView;
