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
