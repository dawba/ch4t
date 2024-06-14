import ChatTile from './ChatTile.tsx';
import { Chat, ID } from '../../types/types.ts';
import Search from '../customs/Search.tsx';

import styles from '../../styles/ChatsListView.module.css';

export const Mock1: Chat = {
  id: '1' as unknown as ID,
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: true,
  users: [],
  messages: [],
};
export const Mock2: Chat = {
  id: '2' as unknown as ID,
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: false,
  users: [],
  messages: [],
};
export const Mock3: Chat = {
  id: '3' as unknown as ID,
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: true,
  users: [],
  messages: [],
};

const ChatListView = ({ chats }: { chats: Chat[] }) => {
  return (
    <div className={styles.groupChatsList}>
      {chats.map((chat: Chat) => (
        <ChatTile key={chat.id.toString()} chat={chat} />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default ChatListView;
