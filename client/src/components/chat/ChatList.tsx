import ChatTile from './ChatTile';
import Search from '../Search';
import styles from '../../styles/ChatList.module.css';
import { ChatData } from '../../types/types.ts';

export const Mock1: ChatData = {
  id: '1',
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: true,
  users: [],
  messages: [],
};
export const Mock2: ChatData = {
  id: '2',
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: false,
  users: [],
  messages: [],
};
export const Mock3: ChatData = {
  id: '3',
  chatName: 'Balanga',
  profilePicture: '../assets/profile.jpg',
  lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
  lastSender: 'Creep',
  isLastMessageRead: true,
  users: [],
  messages: [],
};

const ChatList = ({ chats }: { chats: ChatData[] }) => {
  return (
    <div className={styles.groupChatsList}>
      {chats.map((chat: ChatData) => (
        <ChatTile key={chat.id} chat={chat} />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default ChatList;
