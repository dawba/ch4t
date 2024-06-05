import { IMessageAdapter } from '../interfaces/IMessageAdapter.ts'
import { MessageTileProps } from '../../components/MessageList.tsx'

export const MessageDataAdapter: IMessageAdapter = {
  getMessages: (messageData: any[], currentUser, users): MessageTileProps[] => {
    return messageData.map((message) => {
      const sender = users.find((user) => user.id === message.sender)
      const messageSentByUser = message.sender === currentUser

      return {
        id: message._id,
        message: message.content,
        senderName: sender ?? '',
        timeSent: message.createdAt,
        messageSentByUser,
      }
    })
  },
}
