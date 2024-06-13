import styles from '../../styles/ChatTile.module.css';
import { ReactComponent as ReadIcon } from '../../assets/message_read.svg';
import { ReactComponent as UnreadIcon } from '../../assets/message_unread.svg';
import { ChatData } from '../../types/types.ts';

const ChatTile = ({ chat }: { chat: ChatData }) => {
  const {
    lastMessage,
    lastSender,
    isLastMessageRead,
    chatName,
    profilePicture,
  } = chat;

  const messageToDisplay =
    lastMessage.length > 25 ? lastMessage.slice(0, 25) + '...' : lastMessage;
  const StatusIcon = isLastMessageRead ? ReadIcon : UnreadIcon;
  const lastSenderAndMessage = lastSender + ': ' + messageToDisplay;

  return (
    <div
      className={`h-auto w-full mx-2 flex items-center ${styles.messageTile}`}
    >
      <div className="w-12 h-12 flex-none items-center justify-center border-2 border-primary-yellow rounded-full overflow-hidden mr-4">
        <img
          src={profilePicture}
          className="w-full h-full object-cover"
          alt="Profile picture"
        />
      </div>
      <div className="flex flex-col grow truncate">
        <div className={styles.senderName}>{chatName}</div>
        <div className={styles.lastMessage}>{lastSenderAndMessage}</div>
        <StatusIcon className={'w-4 h-4 flex-none mx-2'} />
      </div>
    </div>
  );
};

export default ChatTile;
