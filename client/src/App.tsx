import  { useState } from 'react';
import ChatView from './components/chat/ChatView.tsx'; // Adjust the import path based on your folder structure
import { ID } from './types/types.ts'; // Adjust the import path based on your folder structure

const App = () => {
  const mockChatId: ID = 'chat123'; // Example chat ID
  const mockCurrentUser: ID = 'user1'; // Example current user ID
  const mockUsers: ID[] = ['user1', 'user2', 'user3']; // Example user IDs

  const [chatId, setChatId] = useState<ID | null>(mockChatId);

  return (
    <div>
      <h1>Chat Application</h1>
      {/* Render ChatView with props */}
      <ChatView chatId={chatId} currentUser={mockCurrentUser} users={mockUsers} />
    </div>
  );
};

export default App;
