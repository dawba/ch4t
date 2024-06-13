import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: (chatData) => {
    return chatData.map((chat) => ({
      id: chat._id,
      chatName: '',
      profilePicture: '',
      lastMessage: '',
      lastSender: '',
      isLastMessageRead: false,
      users: chat?.users || [],
      messages: chat?.messages || [],
    }));
  },
};

export default ChatDataAdapter;
