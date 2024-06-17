import styles from '../../styles/MessageTile.module.css';
import { MessageTileProps } from '../../types/types.ts';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};

const MessageTile = ({
  message,
  senderName,
  timeSent,
  messageSentByUser,
}: MessageTileProps) => {
  return (
    <div
      className={`${styles.messageTile} ${messageSentByUser ? styles.userMessage : styles.otherMessage}`}
    >
      <div className={styles.messageInfo}>
        <span className={styles.senderName}>
          {messageSentByUser ? 'Me' : senderName.toString()}
        </span>
        <span className={styles.timeSent}>
          {formatDate(new Date(timeSent))}
        </span>
      </div>
      <p className={styles.messageText}>{message}</p>
    </div>
  );
};

export default MessageTile;
