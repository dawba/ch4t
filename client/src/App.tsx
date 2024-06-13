import { UserProvider } from './components/UserProvider';
import AddChatView from './components/AddChatView';

const App = () => {
  return (
    <UserProvider>
      <AddChatView />
    </UserProvider>
  );
};

export default App;
