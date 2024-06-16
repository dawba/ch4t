import { ChangeEvent, useState, useContext, useRef } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import useAddChat from '../../hooks/useAddChat.ts';
import ImageUploader from '../customs/ImageUploader.tsx';
import { Chat } from '../../types/types.ts';
import mongoose from 'mongoose';
import { isObjectEmpty } from '../../utils/checkIfEmpty.ts';

type AddChatProps = {
  onChatAdded: (c: Chat) => void;
};
const AddChatView = ({ onChatAdded }: AddChatProps) => {
  const userContext = useContext(UserContext);
  const imageUploaderRef = useRef<{ uploadImage: () => void }>(null);

  const { profilePicture, setProfilePicture } = userContext;
  const [chatName, setChatName] = useState('');
  const [username, setUsername] = useState('');
  const { addedUsers, errorMessage, addUserToChat, createChat } = useAddChat(
    userContext.userId,
    userContext.username
  );

  const handleChatNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleAddUser = async () => {
    await addUserToChat(username);
    setUsername('');
  };

  const handleUpload = () => {
    if (imageUploaderRef.current) {
      imageUploaderRef.current.uploadImage();
    }
  };

  const handleCreateChat = async () => {
    const response = await createChat(chatName, addedUsers, profilePicture);
    if (isObjectEmpty(response) && response?.data) {
      onChatAdded(response.data as Chat);
      handleUpload();
    }
    addedUsers.length = 0;
  };

  return (
    <div className="flex flex-col p-7">
      <ImageUploader
        image={profilePicture}
        setImage={setProfilePicture}
        imageContext={'Chat'}
        id={new mongoose.Types.ObjectId('665f9188a3e68b53b3442c59')}
      />
      <p className="mt-8 ml-2 text-left text-sm">Chat Name</p>
      <input
        type="text"
        className="mt-1 w-full"
        value={chatName}
        onChange={handleChatNameChange}
      />
      <p className="mt-6 ml-2 text-left text-sm">Add Users</p>
      <div className="flex items-center mt-1">
        <input
          type="text"
          className="w-full"
          value={username}
          onChange={handleUsernameChange}
        />
        <button
          className="ml-2 p-2 bg-primary-yellow text-black rounded"
          onClick={handleAddUser}
        >
          Add
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="mt-4">
        {addedUsers.map((user, index) => (
          <p key={index} className="text-sm text-secondary-gray">
            {user.username}
          </p>
        ))}
      </div>
      <button
        className="mt-6 p-2 bg-primary-yellow text-black rounded"
        onClick={handleCreateChat}
      >
        Add Chat
      </button>
    </div>
  );
};

export default AddChatView;
