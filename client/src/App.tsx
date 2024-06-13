// import React from 'react';
// import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
//
// const App: React.FC = () => {
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl">
//                     <Routes>
//                         <Route path="/login" element={<LoginPage/>}/>
//                         <Route path="/" element={<Navigate replace to="/login"/>}/>
//                         <Route path="/register" element={<RegisterPage/>}/>
//                     </Routes>
//                 </div>
//             </BrowserRouter>
//         </div>
//     );
// };
//
// export default App;

import { useState } from 'react';
import ChatView from './components/chat/ChatView.tsx';
import ChatList from './components/chat/ChatList.tsx';
import useChats from './hooks/useChats.ts';
import useLogin from './hooks/useLogin.ts';
import { Credentials } from './types/types.ts';

const App = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const { user, handleLoginUser } = useLogin();
  const { chats, selectedChat, setSelectedChat } = useChats(user?.id || '');
  const { id: userId } = user || { id: '' };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await handleLoginUser(credentials.username, credentials.password);
  };

  return (
    <div className="flex flex-row space-x-4">
      <ChatList chats={chats} setSelectedChat={setSelectedChat} />
      {selectedChat && (
        <ChatView
          chatId={selectedChat.id}
          currentUser={userId}
          users={selectedChat.users}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                username: e?.target?.value,
                password: credentials.password,
              })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                username: credentials.username,
                password: e?.target?.value,
              })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
