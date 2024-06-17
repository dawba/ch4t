import { ReactComponent as ClipIcon } from '../../assets/clip_icon.svg';
import Search from '../customs/Search.tsx';
import MessageList from './MessageList.tsx';
import CustomTextField from './CustomTextField.tsx';
import { Chat } from '../../types/types.ts';
import styles from '../../styles/ChatView.module.css';
import { useUserContext } from '../providers/UserProvider.tsx';
import useScrollToBottom from '../../hooks/useScrollToBottom.ts';
import { Socket } from 'socket.io';
import { useState } from 'react';

export interface ChatViewProps {
  chat: Chat;
  socket: Socket;
}

const ChatView = ({ chat, socket }: ChatViewProps) => {
  const { userId, username } = useUserContext();
  const messageListRef = useScrollToBottom(chat.messages);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages =
    searchQuery !== ''
      ? chat.messages.filter((message) =>
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : chat.messages;

  const handleButtonClick = () => {
    console.log('clicked');
  };

  const handleSubmit = (message: string) => {
    if (!message) {
      return;
    }

    const messageData = {
      chatId: chat.id,
      sender: userId,
      senderName: username,
      message,
    };
    socket.emit('sendMessage', messageData);
  };

  return (
    <div className={styles.chatViewWrapper + ' relative'}>
      <div className="h-full w-full flex flex-col bg-primary-gray relative z-10">
        <div className={styles.topBar}>
          <div className="w-80">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <div className={styles.messageList} ref={messageListRef}>
          <MessageList messages={filteredMessages} />
        </div>
        <div className={styles.inputArea}>
          <button className="mr-2 w-auto h-auto" onClick={handleButtonClick}>
            <ClipIcon className="w-10 h-10" />
          </button>
          <div className={styles.textField}>
            <CustomTextField handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
