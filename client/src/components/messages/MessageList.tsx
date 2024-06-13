import styles from './MessageList.module.css';
import MessageTile from './MessageTile';
import { MessageTileProps } from '../../types/types.ts';

interface MessageListProps {
  messages: MessageTileProps[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className={styles.messageListWrapper}>
      {messages.map((message) => (
        <MessageTile key={message.id} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
