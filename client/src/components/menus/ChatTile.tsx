import { ReactComponent as ReadIcon } from '../../assets/message_read.svg';
import { ReactComponent as UnreadIcon } from '../../assets/message_unread.svg';
import { Chat } from '../../types/types.ts';

import styles from '../../styles/ChatTile.module.css';

const ChatTile = ({ chat }: { chat: Chat }) => {
  const {
    lastMessage,
    lastSender,
    isLastMessageRead,
    chatName,
    profilePicture,
  } = chat;

  const StatusIcon = isLastMessageRead ? ReadIcon : UnreadIcon;
  const lastSenderAndMessage = lastSender + ': ' + lastMessage;

  return (
    <div className={`h-auto w-full flex items-center ${styles.messageTile}`}>
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
      </div>
      <StatusIcon className={'w-4 h-4 flex-none mx-2'} />
    </div>
  );
};

export default ChatTile;
