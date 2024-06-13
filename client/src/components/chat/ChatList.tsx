import ChatTile from './ChatTile';
import styles from '../styles/ChatsList.module.css';
import { Chat, ID } from '../../types/types.ts';
import Search from '../Search.tsx';
import { uuid } from 'uuidv4';

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

const ChatList = ({ chats }: { chats: Chat[] }) => {
  return (
    <div className={styles.groupChatsList}>
      {chats.map((chat: Chat) => (
        <ChatTile key={uuid()} chat={chat} />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default ChatList;
