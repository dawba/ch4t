import { IMessageDataAdapter } from '../interfaces/IMessageDataAdapter.ts';
import {
  ID,
  MessageData,
  MessageTileProps,
  PartialUser,
} from '../../types/types.ts';

export const MessageDataAdapter: IMessageDataAdapter = {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: PartialUser[]
  ): MessageTileProps[] => {
    return messageData.map((message) => {
      const sender = users.find(
        (user: PartialUser) => user.userId === message.sender
      )!!;
      const messageSentByUser = message.sender === currentUser;

      return {
        id: message._id,
        message: message.content,
        senderName: sender.username,
        timeSent: message.createdAt,
        messageSentByUser,
      };
    });
  },
};
