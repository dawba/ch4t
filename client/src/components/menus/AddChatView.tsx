import { ChangeEvent, useState, useContext } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import useAddChat from '../../hooks/useAddChat.ts';
import ImageUploader from '../customs/ImageUploader.tsx';

const AddChatView = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('AddChatView must be used within a UserProvider');
  }

  const { profilePicture, setProfilePicture } = userContext;
  const [chatName, setChatName] = useState('');
  const [username, setUsername] = useState('');
  if (userContext.userId == null) {
    return;
  }
  const {
    addedUsers,
    errorMessage,
    addUserToChat,
    createChat,
    removeUserFromChat,
  } = useAddChat(userContext.userId, userContext.username);

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

  const handleCreateChat = async () => {
    await createChat(chatName, addedUsers, profilePicture);
    addedUsers.length = 0;
  };

  return (
    <div className="flex flex-col p-7">
      <ImageUploader image={profilePicture} setImage={setProfilePicture} />
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
          <div key={index} className="flex justify-between items-center">
            <p className="text-sm text-primary-gray">{user.username}</p>
            <button
              className="text-red-500"
              onClick={() => removeUserFromChat(user.username)}
            >
              -
            </button>
          </div>
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
