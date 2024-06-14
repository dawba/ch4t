import { useEffect } from 'react';
import useMessages from '../../hooks/useMessages.ts';
import useScrollToBottom from '../../hooks/useScrollToBottom.ts';
import {ReactComponent as ClipIcon} from '../../assets/clip_icon.svg';
import {io} from 'socket.io-client';
import Search from '../customs/Search.tsx';
import MessageList from './MessageList.tsx';
import CustomTextField from './CustomTextField.tsx';
import {MessageDataAdapter} from '../../adapters/implementation/MessageDataAdapter.ts';
import {ID, MessageData} from '../../types/types.ts';
import styles from '../../styles/ChatView.module.css';

export interface ChatViewProps {
    chatId: ID | null;
    currentUser: ID | null;
    users: ID[];
}

const socket = io('http://localhost:5050');

const ChatView = ({chatId, currentUser, users}: ChatViewProps) => {
    if (!currentUser) {
        return null;
    }

    const {messages, setMessages} = useMessages({chatId, currentUser, users});
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

        const messageData = {chatId, sender: currentUser, message};
        socket.emit('sendMessage', messageData);
    };

    return (
        <div className={styles.chatViewWrapper + ' relative'}>
            <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-5">
                Create a new chat<br/>or select one from a list!
            </h4>
            {chatId !== null &&
                <div className="h-full w-full flex flex-col bg-primary-gray relative z-10">
                    <div className={styles.topBar}>
                        <div className="w-80">
                            <Search/>
                        </div>
                    </div>
                    <div className={styles.messageList} ref={messageListRef}>
                        <MessageList messages={messages}/>
                    </div>
                    <div className={styles.inputArea}>
                        <button className="mr-2 w-auto h-auto" onClick={handleButtonClick}>
                            <ClipIcon className="w-10 h-10"/>
                        </button>
                        <div className={styles.textField}>
                            <CustomTextField handleSubmit={handleSubmit}/>
                        </div>
                        <button className="border-primary-yellow border-2 rounded-xl mx-auto h-10 w-24 hover:opacity-80"
                                onClick={handleButtonClick}>Send
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default ChatView;
