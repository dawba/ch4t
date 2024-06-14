import styles from '../../styles/MessageList.module.css';
import MessageTile from './MessageTile.tsx';
import { MessageTileProps } from '../../types/types.ts';

interface MessageListProps {
  messages: MessageTileProps[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className={styles.messageListWrapper}>
      {messages.map((message) => (
        <MessageTile key={message.id.toString()} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
