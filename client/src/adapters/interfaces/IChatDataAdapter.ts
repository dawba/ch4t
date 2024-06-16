import { Chat, ChatData, ID } from '../../types/types.ts';

export interface IChatDataAdapter {
  getChats: (chatData: ChatData[], currentUserId: ID) => Promise<Chat[]>;
}
