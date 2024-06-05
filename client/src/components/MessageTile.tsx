import styles from './MessageTile.module.css'
import { MessageTileProps } from './MessageList.tsx'

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
        <span className={styles.timeSent}>{timeSent}</span>
      </div>
      <p className={styles.messageText}>{message}</p>
    </div>
  )
}

export default MessageTile
