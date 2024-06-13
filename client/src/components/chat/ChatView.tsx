import mongoose from 'mongoose';

import { useEffect } from 'react';
import useMessages from '../../hooks/useMessages.ts';
import useScrollToBottom from '../../hooks/useScrollToBottom.ts';

import { io } from 'socket.io-client';

import Search from '../Search.tsx';
import MessageList from '../messages/MessageList.tsx';
import ImageButton from '../ImageButton.tsx';
import CustomTextField from '../CustomTextField.tsx';

import attachmentButton from '../assets/attachment_button.png';
import sendButton from '../assets/send_button.png';
import { MessageDataAdapter } from '../../adapters/implementation/MessageDataAdapter.ts';
import { MessageData } from '../../types/types.ts';

import styles from '../styles/ChatView.module.css';

export interface ChatViewProps {
  chatId: string;
  currentUser: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
}

const socket = io('http://localhost:5050');

const ChatView = ({ chatId, currentUser, users }: ChatViewProps) => {
  const { messages, setMessages } = useMessages({ chatId, currentUser, users });
  const messageListRef = useScrollToBottom(messages);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('receiveMessage', (message: MessageData) => {
      console.log('received message:', message);
      const receivedMessage = MessageDataAdapter.getMessages(
        [message],
        currentUser,
        users
      );

      setMessages((prevMessages) => [...prevMessages, ...receivedMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  });

  const handleButtonClick = () => {
    console.log('clicked');
  };

  const handleSubmit = (message: string) => {
    if (!message) {
      return;
    }

    const messageData = { chatId, sender: currentUser, message };
    socket.emit('sendMessage', messageData);
  };

  return (
    <div className={styles.chatViewWrapper}>
      <div className={styles.topBar}>
        <Search />
      </div>
      <div className={styles.messageList} ref={messageListRef}>
        <MessageList messages={messages} />
      </div>
      <div className={styles.inputArea}>
        <div className={styles.attachmentButton}>
          <ImageButton image={attachmentButton} onClick={handleButtonClick} />
        </div>
        <div className={styles.textField}>
          <CustomTextField handleSubmit={handleSubmit} />
        </div>
        <div className={styles.attachmentButton}>
          <ImageButton image={sendButton} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
