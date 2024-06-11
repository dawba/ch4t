import { useEffect, useState } from 'react'
import ChatDataAdapter from '../adapters/implementation/ChatDataAdapter.ts'
import mongoose from 'mongoose'

interface ChatData {
  id: string
  chatName: string
  profilePicture: string
  lastMessage: string
  lastMessageSenderName: string
  lastMessageStatus: 'read' | 'unread'
  users: mongoose.Types.ObjectId[]
  messages: mongoose.Types.ObjectId[]
}

const useChats = (userId: string) => {
  const API_URL = `http://localhost:5050/api/chat/user/${userId}`
  const [chats, setChats] = useState<ChatData[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatData>(chats[0])

  useEffect(() => {
    if (!userId) {
      return
    }

    const fetchUserChats = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        const chatData = ChatDataAdapter.getChats(data)
        setChats(chatData)
        setSelectedChat(chatData[0])
      } catch (error) {
        console.error('Error fetching user chats:', error)
      }
    }

    fetchUserChats()
  }, [API_URL, userId])

  return { chats, setChats, selectedChat, setSelectedChat }
}

export default useChats
