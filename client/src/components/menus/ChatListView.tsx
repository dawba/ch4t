import ChatTile from './ChatTile.tsx';
import { Chat } from '../../types/types.ts';
import Search from '../customs/Search.tsx';

import styles from '../../styles/ChatsListView.module.css';
import { Dispatch, SetStateAction } from 'react';

export type ChatListProps = {
  chats: Chat[];
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
};

const ChatListView = ({ chats, setSelectedChat }: ChatListProps) => {
  return (
    <div className={styles.groupChatsList}>
      {chats.map((chat: Chat) => (
        <ChatTile
          key={chat?.id?.toString()}
          chat={chat}
          setSelectedChat={setSelectedChat}
        />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default ChatListView;
