import { UserProvider } from './components/UserProvider';
import SettingsView from './components/AddChatView';

function App() {
  return (
    <UserProvider>
      <SettingsView />
    </UserProvider>
  );
}

export default App;