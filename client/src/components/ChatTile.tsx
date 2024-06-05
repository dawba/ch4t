import styles from './ChatTile.module.css'
import {ReactComponent as ReadIcon} from '../assets/message_read.svg';
import {ReactComponent as UnreadIcon} from '../assets/message_unread.svg';

type Props = {
    chatName: string
    profilePicture: string
    lastMessage: string
    lastSender: string
    isLastMessageRead: boolean
}

export const Mock: Props = {
    chatName: 'Balanga',
    profilePicture: '../assets/profile.jpg',
    lastMessage: 'I ma a creep, I am a weirdo, What the hell am I doing here',
    lastSender: 'Creep',
    isLastMessageRead: true
}

const ChatTile = ({ chatName, profilePicture, lastMessage, lastSender, isLastMessageRead }: Props) => {
    const StatusIcon = isLastMessageRead ? ReadIcon : UnreadIcon
    const lastSenderAndMessage = lastSender + ': ' + lastMessage

    return (
        <div className={`h-auto w-full mx-2 flex items-center ${styles.messageTile}`}>
            <div className="w-12 h-12 flex-none items-center justify-center border-2 border-primary-yellow rounded-full overflow-hidden mr-4">
                <img
                    src={profilePicture}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col grow truncate">
                <p className={styles.chatName}>{chatName}</p>
                <p className={styles.lastMessage}>
                    {lastSenderAndMessage}
                </p>
            </div>
            <StatusIcon className={'w-4 h-4 flex-none mx-2'}/>
        </div>
    )
}

export default ChatTile
