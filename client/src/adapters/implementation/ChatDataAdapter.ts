import { IChatDataAdapter } from '../interfaces/IChatDataAdapter.ts';
import { MessageDataAdapter } from './MessageDataAdapter.ts';
import MessageRepository from '../../api/MessageRepository.ts';
import { ImageData, MessageData, User } from '../../types/types.ts';
import ImageRepository from '../../api/ImageRepository.ts';
import { ImageDataAdapter } from './ImageDataAdapter.ts';
import UserRepository from '../../api/UserRepository.ts';

const ChatDataAdapter: IChatDataAdapter = {
  getChats: async (chatData, currentUserId) => {
    const chatPromises = chatData.map((chat) => {
      const messagesPromise = MessageRepository.getAllMessagesForChat(chat._id);
      const imagePromise = ImageRepository.getImageById(chat.chatPicture);
      return { chat, messagesPromise, imagePromise };
    });

    return await Promise.all(
      chatPromises.map(async ({ chat, messagesPromise, imagePromise }) => {
        const [messagesResponse, imageResponse] = await Promise.all([
          messagesPromise,
          imagePromise,
        ]);

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

        const lastMessage = messages[messages.length - 1] ?? null;

        if (lastMessage === null) {
          return {
            id: chat._id,
            chatName: chat.name,
            chatPicture: image,
            lastMessage: '',
            lastSender: '',
            isLastMessageRead: false,
            users: chat?.users || [],
            messages: messages,
          };
        }

        const response = await UserRepository.getUserByUsername(
          lastMessage.senderName
        );

        const { data } = response;

        if (Object(data).keys.length == 0 || data == null) {
          return {
            id: chat._id,
            chatName: chat.name,
            chatPicture: image,
            lastMessage: lastMessage.message,
            lastSender: '',
            isLastMessageRead: false,
            users: chat?.users || [],
            messages: messages,
          };
        }

        const user = data as User;

        return {
          id: chat._id,
          chatName: chat.name,
          chatPicture: image,
          lastMessage: lastMessage.message,
          lastSender: user.username,
          isLastMessageRead: false,
          users: chat?.users || [],
          messages: messages,
        };
      })
    );
  },
};

export default ChatDataAdapter;
