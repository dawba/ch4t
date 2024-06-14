import styles from '../../styles/MessageList.module.css';
import MessageTile from './MessageTile';
import { MessageTileProps } from '../../types/types.ts';
import { uuid } from 'uuidv4';

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
