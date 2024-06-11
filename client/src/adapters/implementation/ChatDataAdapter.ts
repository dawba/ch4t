import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: (chatData) => {
    return chatData.map((chat) => ({
      id: chat._id,
      chatName: chat?.chatName || '',
      profilePicture: chat?.profilePicture || '',
      lastMessage: chat?.lastMessage || '',
      lastSender: chat?.lastMessageSenderName || '',
      isLastMessageRead: chat?.isLastMessageRead || false,
      users: chat?.users || [],
      messages: chat?.messages || [],
    }));
  },
};

export default ChatDataAdapter;
