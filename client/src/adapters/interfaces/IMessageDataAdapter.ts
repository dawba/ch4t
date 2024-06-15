import { ID, MessageData, MessageTileProps } from '../../types/types.ts';

export interface IMessageDataAdapter {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: ID[]
  ) => MessageTileProps[];
}
