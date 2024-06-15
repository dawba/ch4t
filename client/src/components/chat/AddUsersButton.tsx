// AddUsersButton.tsx

import { useState, ChangeEvent, useContext } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../providers/UserProvider.tsx';
import { ID } from '../../types/types.ts';
import useAddUserToChat from '../../hooks/useAddUserToChat.ts';

interface AddUsersButtonProps {
    chatId: ID;
}

const AddUsersButton = ({ chatId }: AddUsersButtonProps) => {
    const userContext = useContext(UserContext);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const { addedUsers, errorMessage, addUserToChat } = useAddUserToChat(chatId);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleAddUser = async () => {
        await addUserToChat(username);
        setUsername('');
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="text-blue-500">
                Add Users
            </button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Users"
            >
                <h2>Add Users to Chat</h2>
                <input
                    type="text"
                    className="mt-1 w-full"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <button
                    className="ml-2 p-2 bg-primary-yellow text-black rounded"
                    onClick={handleAddUser}
                >
                    Add
                </button>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                <div className="mt-4">
                    {addedUsers.map((user, index) => (
                        <p key={index} className="text-sm text-secondary-gray">
                            {user.username}
                        </p>
                    ))}
                </div>
                <button onClick={() => setIsModalOpen(false)} className="mt-6 p-2 bg-gray-500 text-white rounded">
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default AddUsersButton;
