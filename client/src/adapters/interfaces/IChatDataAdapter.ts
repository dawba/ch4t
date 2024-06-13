import { Chat, ChatData } from '../../types/types.ts';

export interface IChatDataAdapter {
  getChats: (chatData: Chat[]) => ChatData[];
}
