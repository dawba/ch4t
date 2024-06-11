import ChatTile from './ChatTile'
import Search from './Search'
import styles from './ChatList.module.css'
import { ChatData } from '../adapters/interfaces/IChatDataAdapter.ts'

const ChatList = ({
  chats,
  setSelectedChat,
}: {
  chats: ChatData[]
  setSelectedChat: (value: ChatData) => void
}) => {
  return (
    <div className={styles.groupChatsList}>
      {chats.map((chat: ChatData) => (
        <ChatTile key={chat.id} chat={chat} setSelectedChat={setSelectedChat} />
      ))}
      <div className={styles.searchBarWrapper}>
        <Search />
      </div>
    </div>
  )
}

export default ChatList
