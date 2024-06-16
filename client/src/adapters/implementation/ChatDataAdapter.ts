import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';
import { MessageDataAdapter } from './MessageDataAdapter.ts';
import MessageRepository from '../../api/MessageRepository.ts';
import { Chat, ImageData, MessageData } from '../../types/types.ts';
import ImageRepository from '../../api/ImageRepository.ts';
import { ImageDataAdapter } from './ImageDataAdapter.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: async (chatData, currentUserId) => {
    const chatPromises = chatData.map(chat => {
      const messagesPromise = MessageRepository.getAllMessagesForChat(chat._id);
      const imagePromise = ImageRepository.getImageById(chat.chatPicture);
      return { chat, messagesPromise, imagePromise };
    });

    const results = await Promise.all(
      chatPromises.map(async ({ chat, messagesPromise, imagePromise }) => {
        const [messagesResponse, imageResponse] = await Promise.all([messagesPromise, imagePromise]);

        const messages = messagesResponse.data
          ? MessageDataAdapter.getMessages(
              messagesResponse.data as MessageData[],
              currentUserId,
              chat.users
            )
          : [];

        const image = imageResponse.data
          ? ImageDataAdapter.getImages(imageResponse.data as ImageData)
          : null;

        const lastMessage = messages[messages.length - 1]?.message ?? '';
        const response = await UserRepository.getUserById(lastMessage.sender);
        const lastSender =response?.data?.username || ''

        return {
          id: chat._id,
          chatName: chat.name,
          chatPicture: image,
          lastMessage: lastMessage,
          lastSender: lastSender,
          isLastMessageRead: false,
          users: chat?.users || [],
          messages: messages,
        };
      })
    );

    return results;
  },
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
