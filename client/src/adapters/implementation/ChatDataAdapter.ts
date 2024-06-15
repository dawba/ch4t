import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';
import { MessageDataAdapter } from './MessageDataAdapter.ts';
import MessageRepository from '../../api/MessageRepository.ts';
import { Chat, ImageData, MessageData } from '../../types/types.ts';
import ImageRepository from '../../api/ImageRepository.ts';
import { ImageDataAdapter } from './ImageDataAdapter.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: async (chatData, currentUserId) => {
    const chats: Chat[] = [];
    for (const chat of chatData) {
      const messagesResponse = await MessageRepository.getAllMessagesForChat(
        chat._id
      );
      const messages = messagesResponse.data
        ? MessageDataAdapter.getMessages(
            messagesResponse.data as MessageData[],
            currentUserId,
            chat.users
          )
        : [];
      const imageResponse = await ImageRepository.getImageById(
        chat.chatPicture
      );
      const image = imageResponse.data
        ? ImageDataAdapter.getImages(imageResponse.data as ImageData)
        : null;
      const lastMessage = messages[0]?.message ?? '';
      const lastSender = messages[0]?.senderName ?? '';
      chats.push({
        id: chat._id,
        chatName: chat.name,
        chatPicture: image,
        lastMessage: lastMessage,
        lastSender: lastSender,
        isLastMessageRead: false,
        users: chat?.users || [],
        messages: messages,
      });
    }
    return chats;
  },
};

export default ChatDataAdapter;
