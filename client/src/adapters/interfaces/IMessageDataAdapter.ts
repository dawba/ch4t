import {
  ID,
  MessageData,
  MessageTileProps,
  PartialUser,
} from '../../types/types.ts';

export interface IMessageDataAdapter {
  getMessages: (
    messageData: MessageData[],
    currentUser: ID,
    users: PartialUser[]
  ) => MessageTileProps[];
}
