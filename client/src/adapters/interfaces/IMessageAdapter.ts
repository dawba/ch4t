import { MessageTileProps } from '../../components/MessageList.tsx'
import mongoose from 'mongoose'

export interface IMessageAdapter {
  getMessages: (
    messageData: any,
    currentUser: string,
    users: mongoose.Types.ObjectId[]
  ) => MessageTileProps[]
}
