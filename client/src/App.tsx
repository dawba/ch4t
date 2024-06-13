import React, { useState } from 'react';
import useChats from './hooks/useChats.ts';
import useLogin from './hooks/useLogin.ts';
import { Credentials } from './types/types.ts';
import ChatList from './components/chat/ChatList.tsx';
import ChatView from './components/chat/ChatView.tsx';

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

const App = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const { user, handleLoginUser } = useLogin();
  const { chats, selectedChat } = useChats(user?.id ?? null);
  const userId = user?.id ?? null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLoginUser(credentials.username, credentials.password);
  };

  return (
    <div className="flex flex-row space-x-4">
      <ChatList chats={chats} />
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
