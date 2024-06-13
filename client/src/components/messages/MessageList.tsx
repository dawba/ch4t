import styles from './MessageList.module.css';
import MessageTile from './MessageTile';
import { MessageTileProps } from '../../types/types.ts';
import { v4 as uuid } from 'uuid';

interface MessageListProps {
  messages: MessageTileProps[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className={styles.messageListWrapper}>
      {messages.map((message) => (
        <MessageTile key={uuid()} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
