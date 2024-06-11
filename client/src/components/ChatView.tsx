import mongoose from 'mongoose'

import styles from './ChatView.module.css'
import Search from './Search'
import MessageList, { MessageTileProps } from './MessageList'
import ImageButton from './ImageButton'
import attachmentButton from '../assets/attachment_button.png'
import sendButton from '../assets/send_button.png'
import CustomTextField from './CustomTextField'
import useMessages from '../hooks/useMessages'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { MessageDataAdapter } from '../adapters/implementation/MessageDataAdapter.ts'
import { useScrollToBottom } from '../hooks/useScrollToBottom.ts'

export interface ChatViewProps {
  chatId: string
  currentUser: string
  users: mongoose.Types.ObjectId[]
}

const socket = io('http://localhost:5050')

const ChatView = ({ chatId, currentUser, users }: ChatViewProps) => {
  const { messages, setMessages } = useMessages({ chatId, currentUser, users })
  const messageListRef = useScrollToBottom(messages)

  useEffect(() => {
    socket.emit('joinChat', chatId)

    socket.on('receiveMessage', (message: MessageTileProps) => {
      console.log('received message:', message)
      const receivedMessage = MessageDataAdapter.getMessages(
        [message],
        currentUser,
        users
      )

      setMessages((prevMessages) => [...prevMessages, ...receivedMessage])
    })

    return () => {
      socket.off('receiveMessage')
    }
  })

  const handleButtonClick = () => {
    console.log('clicked')
  }

  const handleSubmit = (message: string) => {
    if (!message) {
      return
    }

    const messageData = { chatId, sender: currentUser, message }
    socket.emit('sendMessage', messageData)
  }

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
  )
}

export default ChatView
