/*
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import MainPage from './pages/MainPage.tsx';
import { UserProvider } from './components/providers/UserProvider.tsx';

const App = () => {
  return (
    <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl overflow-hidden">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <UserProvider>
              <MainPage />
            </UserProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
*/
import mongoose from 'mongoose';
import { Chat, ID, PartialUser, MessageTileProps, Image } from './types/types';
import { UserProvider } from './components/providers/UserProvider.tsx';
import ChatView from './components/chat/ChatView.tsx';

const mockUserId1 = new mongoose.Types.ObjectId();
const mockUserId2 = new mongoose.Types.ObjectId();
const mockMessageId1 = new mongoose.Types.ObjectId();
const mockMessageId2 = new mongoose.Types.ObjectId();
const mockChatId = new mongoose.Types.ObjectId();
const mockImageId = new mongoose.Types.ObjectId();

const mockChat: Chat = {
  id: mockChatId,
  chatName: 'Test Chat',
  chatPicture: {
    id: mockImageId,
    url: 'https://example.com/image.png',
    name: 'chatPicture',
    contentType: 'image/png',
    createdAt: new Date(),
  } as Image,
  lastMessage: 'Hello, this is the last message.',
  lastSender: 'user1',
  isLastMessageRead: true,
  users: [
    { username: 'user1', userId: mockUserId1 },
    { username: 'user2', userId: mockUserId2 },
  ],
  messages: [
    {
      id: mockMessageId1,
      message: 'Hello!',
      senderName: 'user1',
      timeSent: new Date(),
      messageSentByUser: true,
    },
    {
      id: mockMessageId2,
      message: 'Hi, how are you?',
      senderName: 'user2',
      timeSent: new Date(),
      messageSentByUser: false,
    },
  ] as MessageTileProps[],
};

const App = () => {
  return (
    <UserProvider>
      <ChatView chat={mockChat} />
    </UserProvider>
  );
};

export default App;
