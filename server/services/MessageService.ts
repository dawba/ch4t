import Message from "../model/Message";
import Chat from "../model/Chat";

export const getAllUserMessages = async (userId: string) => {
  return Message.find({ sender: userId });
};

export const getMessageById = async (id: string) => {
  return Message.findById(id);
};

export const createMessage = async (messageData: any) => {
  const message = new Message(messageData);
  await message.save();

  const { chat } = messageData;

  await Chat.findByIdAndUpdate(chat, { $push: { messages: message._id } });

  return message;
};

export const updateMessage = async (id: string, messageData: any) => {
  return await Message.findByIdAndUpdate(id, messageData, {
    new: true,
  });
};

export const deleteMessage = async (id: string) => {
  const message = await Message.findByIdAndUpdate(
    id,
    { content: "" },
    {
      new: true,
    },
  );

  return message;
};
