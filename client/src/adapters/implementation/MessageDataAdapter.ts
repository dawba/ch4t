import { IMessageAdapter } from '../interfaces/IMessageAdapter.ts';
import { ID, MessageData, MessageTileProps } from '../../types/types.ts';

export const MessageDataAdapter: IMessageAdapter = {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: ID[]
  ): MessageTileProps[] => {
    return messageData.map((message) => {
      const sender = users.find((user: ID) => user === message.sender);
      const messageSentByUser = message.sender === currentUser;

      const senderName = sender;

      return {
        id: message._id,
        message: message.content,
        senderName: senderName ?? '',
        timeSent: message.createdAt,
        messageSentByUser,
      };
    });
  },
};
