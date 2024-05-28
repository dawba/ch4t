// src/components/GroupChatList.tsx
import React from 'react'
import ChatTile from './ChatTile'
import Search from './Search' 
import styles from './GroupChatsList.module.css'
type LastMessageStatus = 'read' | 'unread'
interface ChatData {
    chatName: string
    profilePicture: string
    lastMessage: string
    lastMessageSenderName: string
    lastMessageStatus: LastMessageStatus
}

interface Props {
    chats: ChatData[]
}

const GroupChatsList: React.FC<Props> = ({ chats }) => {
    return (
        <div className={styles.groupChatsList}>
            {chats.map((chat, index) => (
                <ChatTile key={index} {...chat} />
            ))}
            <div className={styles.searchBarWrapper}>
                <Search/>
            </div>
        </div>
    )
}

export default GroupChatsList
