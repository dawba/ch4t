
import ChatTile from './ChatTile'
import Search from './Search'
import styles from './GroupChatsList.module.css'
type LastMessageStatus = 'read' | 'unread'
interface ChatData {
    id: string;
    chatName: string
    profilePicture: string
    lastMessage: string
    lastMessageSenderName: string
    lastMessageStatus: LastMessageStatus
}

interface Props {
    chats: ChatData[]
}

const GroupChatsList = ({ chats }: Props) => {
    return (
        <div className={styles.groupChatsList}>
            {chats.map((chat) => (
                <ChatTile key={chat.id} {...chat} />
            ))}
            <div className={styles.searchBarWrapper}>
                <Search />
            </div>
        </div>
    )
}

export default GroupChatsList
