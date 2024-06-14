import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import MainPage from './pages/MainPage.tsx';
import 'index.css';

const App = () => {
  return (
    <div className="App">
      <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl">
        {/*<Routes>*/}
        {/*  <Route path="/login" element={<LoginPage />} />*/}
        {/*  <Route path="/register" element={<RegisterPage />} />*/}
        {/*  <Route path="/" element={<MainPage />} />*/}
        {/*</Routes>*/}
        <MainPage />
      </div>
    </div>
  );
};

export default App;
