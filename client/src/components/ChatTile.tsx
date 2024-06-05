import styles from './ChatTile.module.css'
import messageRead from '../assets/message_read.svg'
import messageNotRead from '../assets/message_not_read.svg'
import { ChatData } from '../adapters/interfaces/IChatDataAdapter.ts'

const ChatTile = ({
  chat,
  setSelectedChat,
}: {
  chat: ChatData
  setSelectedChat: (value: ChatData) => void
}) => {
  const {
    lastMessage,
    lastMessageSenderName,
    lastMessageStatus,
    chatName,
    profilePicture,
    id,
  } = chat

  const messageToDisplay =
    lastMessage.length > 25 ? lastMessage.slice(0, 25) + '...' : lastMessage
  const statusImage =
    lastMessageStatus === 'read' ? messageRead : messageNotRead
  const messageFromLastSender = lastMessageSenderName + ': ' + messageToDisplay

  return (
    <button
      type="button"
      className={`flex items-center ${styles.messageTile}`}
      onClick={() => setSelectedChat(chat)}
    >
      <div className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full overflow-hidden mr-4">
        <img
          src={profilePicture}
          className="w-full h-full object-cover"
          alt="Profile picture"
        />
      </div>
      <div className="flex flex-col">
        <div className={styles.senderName}>{chatName}</div>
        <div className={styles.lastMessage}>
          {messageFromLastSender}
          <img
            src={statusImage}
            className={styles.messageStateIcon}
            alt="Status image"
          />
        </div>
      </div>
    </button>
  )
}

export default ChatTile
