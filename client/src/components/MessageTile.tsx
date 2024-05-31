import styles from './MessageTile.module.css'

interface MessageTileProps {
    id: string
    message: string
    senderName: string
    timeSent: string
    messageSentByUser: boolean
}

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
                    {messageSentByUser ? 'Me' : senderName}
                </span>
                <span className={styles.timeSent}>{timeSent}</span>
            </div>
            <p className={styles.messageText}>{message}</p>
        </div>
    )
}

export default MessageTile
