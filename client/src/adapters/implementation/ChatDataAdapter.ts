import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';
import { MessageDataAdapter } from './MessageDataAdapter.ts';
import MessageRepository from '../../api/MessageRepository.ts';
import { ImageData, MessageData } from '../../types/types.ts';
import ImageRepository from '../../api/ImageRepository.ts';
import { ImageDataAdapter } from './ImageDataAdapter.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: async (chatData, currentUserId) => {
    const chatPromises = chatData.map((chat) => {
      const messagesPromise = MessageRepository.getAllMessagesForChat(chat._id);
      // const imagePromise = ImageRepository.getImageById(chat.chatPicture);
      return { chat, messagesPromise };
    });

    return await Promise.all(
      chatPromises.map(async ({ chat, messagesPromise }) => {
        const [messagesResponse] = await Promise.all([messagesPromise]);

        const messages = messagesResponse.data
          ? MessageDataAdapter.getMessages(
              messagesResponse.data as MessageData[],
              currentUserId,
              chat.users
            )
          : [];

        // const image = imageResponse.data
        //   ? ImageDataAdapter.getImages(imageResponse.data as ImageData)
        //   : null;

        const lastMessage = messages[messages.length - 1] ?? null;

        if (lastMessage === null) {
          return {
            id: chat._id,
            chatName: chat.name,
            chatPicture: null,
            lastMessage: '',
            lastSender: '',
            isLastMessageRead: false,
            users: chat?.users || [],
            messages: messages,
          };
        }

        return {
          id: chat._id,
          chatName: chat.name,
          chatPicture: null,
          lastMessage: lastMessage.message,
          lastSender: lastMessage.senderName,
          isLastMessageRead: false,
          users: chat?.users || [],
          messages: messages,
        };
      })
    );
  },
};

export default ChatDataAdapter;
