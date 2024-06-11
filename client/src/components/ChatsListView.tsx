import ChatTile from './ChatTile'
import Search from './Search'
import styles from '../styles/ChatsListView.module.css'
interface ChatData {
    id: string;
    chatName: string
    profilePicture: string
    lastMessage: string
    lastSender: string
    isLastMessageRead: boolean
}

export const Mock1: ChatData = {
    id: '1',
    chatName: 'Balanga',
    profilePicture: '../assets/profile.jpg',
    lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
    lastSender: 'Creep',
    isLastMessageRead: true
};
export const Mock2: ChatData = {
    id: '2',
    chatName: 'Balanga',
    profilePicture: '../assets/profile.jpg',
    lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
    lastSender: 'Creep',
    isLastMessageRead: false
};
export const Mock3: ChatData = {
    id: '3',
    chatName: 'Balanga',
    profilePicture: '../assets/profile.jpg',
    lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
    lastSender: 'Creep',
    isLastMessageRead: true
};

interface Props {
    areChatsDirect: boolean
    chats: ChatData[]
}

const ChatsListView = ({ areChatsDirect, chats }: Props) => {
    console.log(areChatsDirect);
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

export default ChatsListView
