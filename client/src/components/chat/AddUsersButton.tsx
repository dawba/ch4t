// AddUsersButton.tsx

import { useState, ChangeEvent, useContext } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../providers/UserProvider.tsx';
import { ID } from '../../types/types.ts';
import useAddUsersToChat from '../../hooks/useAddUsersButton.ts';

interface AddUsersButtonProps {
  chatId: ID;
}

const AddUsersButton = ({ chatId }: AddUsersButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const { addedUsers, errorMessage, addUserToChat, updateChat } =
    useAddUsersToChat({
      chatId,
    });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleAddUser = async () => {
    await addUserToChat(username);
    setUsername('');
  };

  const handleUpdateChat = async () => {
    await updateChat(addedUsers);
    setUsername('');
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-primary-yellow"
      >
        Add Users
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Users"
        className="bg-secondary-gray rounded-lg p-6 max-w-md mx-auto my-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4">Add Users to Chat</h2>
        <div>
          <input
            type="text"
            className="w-full p-2  border-primary-yellow rounded mb-4"
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
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          {addedUsers.map((user, index) => (
            <p key={index} className="text-sm text-primary-gray">
              {user.username}
            </p>
          ))}
        </div>
        <button
          className="w-full p-2 bg-primary-yellow text-black rounded mb-4"
          onClick={handleUpdateChat}
        >
          Add Users To Chat
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full p-2 bg-gray-500 text-white rounded mt-4"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default AddUsersButton;
