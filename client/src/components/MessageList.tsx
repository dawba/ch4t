import styles from './MessageList.module.css'
import MessageTile from './MessageTile'
import { Types } from 'mongoose'

export interface MessageTileProps {
  id: string
  message: string
  senderName: string | Types.ObjectId
  timeSent: string
  messageSentByUser: boolean
}

interface MessageListProps {
  messages: MessageTileProps[]
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className={styles.messageListWrapper}>
      {messages.map((message) => (
        <MessageTile key={message.timeSent} {...message} />
      ))}
    </div>
  )
}

export default MessageList
