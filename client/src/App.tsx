import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import MessagingPage from './pages/MessagingPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
      </Routes>
    </div>
  );
};

export default App;
// const [credentials, setCredentials] = useState<Credentials>({
//   username: '',
//   password: '',
// });
// const { user, handleLoginUser } = useLogin();
// const { chats, selectedChat } = useChats(user?.id ?? null);
// const userId = user?.id ?? null;
//
// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   handleLoginUser(credentials.username, credentials.password);
// };
// <div className="flex flex-row space-x-4">
//   <ChatList chats={chats} />
//   {selectedChat && (
//     <ChatView
//       chatId={selectedChat.id}
//       currentUser={userId}
//       users={selectedChat.users}
//     />
//   )}
//   <form onSubmit={handleSubmit}>
//     <label>
//       Username:
//       <input
//         type="text"
//         value={credentials.username}
//         onChange={(e) =>
//           setCredentials({
//             username: e?.target?.value,
//             password: credentials.password,
//           })
//         }
//       />
//     </label>
//     <label>
//       Password:
//       <input
//         type="password"
//         value={credentials.password}
//         onChange={(e) =>
//           setCredentials({
//             username: credentials.username,
//             password: e?.target?.value,
//           })
//         }
//       />
//     </label>
//     <button type="submit">Submit</button>
//   </form>
// </div>
