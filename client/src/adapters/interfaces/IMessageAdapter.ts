import { ID, MessageData, MessageTileProps } from '../../types/types.ts';

export interface IMessageAdapter {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: ID[]
  ) => MessageTileProps[];
}
