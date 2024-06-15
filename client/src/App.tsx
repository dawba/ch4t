import  { useState } from 'react';
import ChatView from './components/chat/ChatView.tsx'; // Adjust the import path based on your folder structure
import { ID } from './types/types.ts'; // Adjust the import path based on your folder structure
import AddUsersButton from "./components/chat/AddUsersButton.tsx";
import mongoose from "mongoose";

const App = () => {
  const mockChatId: ID = 'chat123'; // Example chat ID
  const mockCurrentUser: ID = 'user1'; // Example current user ID
  const mockUsers: ID[] = ['user1', 'user2', 'user3']; // Example user IDs

  const [chatId, setChatId] = useState<ID | null>(mockChatId);

  return (
    <div>
      <h1>Chat Application</h1>
      {/* Render ChatView with props */}
      <AddUsersButton chatId={new mongoose.Types.ObjectId('665f91aca3e68b53b3442c5f')} />
    </div>
  );
};

export default App;
