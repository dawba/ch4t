import styles from './ChatTile.module.css'
import messageRead from '../assets/message_read.svg'
import messageNotRead from '../assets/message_not_read.svg'
type LastMessageStatus = 'read' | 'unread'
interface Props {
    chatName: string
    profilePicture: string
    lastMessage: string
    lastMessageSenderName: string
    lastMessageStatus: LastMessageStatus
}

const MessageTile = ({
    chatName,
    profilePicture,
    lastMessage,
    lastMessageSenderName,
    lastMessageStatus,
}: Props) => {
    const messageToDisplay =
        lastMessage.length > 25 ? lastMessage.slice(0, 25) + '...' : lastMessage
    const statusImage =
        lastMessageStatus === 'read' ? messageRead : messageNotRead
    return (
        <div className={`flex items-center ${styles.messageTile}`}>
            <div className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full overflow-hidden mr-4">
                <img
                    src={profilePicture}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <div className={styles.senderName}>{chatName}</div>
                <div className={styles.lastMessage}>
                    {lastMessageSenderName + ': '}
                    {messageToDisplay}
                    <img
                        src={statusImage}
                        className={styles.messageStateIcon}
                    />
                </div>
            </div>
        </div>
    )
}

export default MessageTile

/* close_ring_light */
