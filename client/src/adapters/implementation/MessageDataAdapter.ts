import { IMessageDataAdapter } from '../interfaces/IMessageDataAdapter.ts';
import { ID, MessageData, MessageTileProps } from '../../types/types.ts';

export const MessageDataAdapter: IMessageDataAdapter = {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: ID[]
  ): MessageTileProps[] => {
    return messageData.map((message) => {
      const sender = users.find((user: ID) => user === message.sender);
      const messageSentByUser = message.sender === currentUser;

      return {
        id: message._id,
        message: message.content,
        senderName: sender ?? '',
        timeSent: message.createdAt,
        messageSentByUser,
      };
    });
  },
};
