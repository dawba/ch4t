import { useState } from 'react'
import mongoose from 'mongoose'

type User = {
  id: string
  username: string
  password: string
  chats: mongoose.Types.ObjectId[]
  isVerified: boolean
  verificationToken: string
  createdAt: Date
}

const useLogin = () => {
  const API_URL = 'http://localhost:5050/api/user/login'
  const [user, setUser] = useState<User | null>(null)

  const handleLoginUser = async (username: string, password: string) => {
    console.log('Logging in with:', username, password)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Network response was not [ok]')
      }

      const data = await response.json()
      const userData = data.user
      setUser({
        id: userData._id,
        username: userData.username,
        password: userData.password,
        chats: userData.chats,
        isVerified: userData.isVerified,
        verificationToken: userData.verificationToken,
        createdAt: new Date(userData.createdAt),
      })
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  return { user, handleLoginUser }
}

export default useLogin
