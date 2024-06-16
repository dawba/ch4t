import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import MainPage from './pages/MainPage.tsx';
import { UserProvider } from './components/providers/UserProvider.tsx';

const App = () => {
  return (
    <UserProvider>
      <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl overflow-hidden">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
