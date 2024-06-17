import styles from '../../styles/MessageList.module.css';
import MessageTile from './MessageTile.tsx';
import { MessageTileProps } from '../../types/types.ts';

interface MessageListProps {
  messages: MessageTileProps[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className={styles.messageListWrapper}>
      {messages.map((message, index) => (
        <MessageTile key={index} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
