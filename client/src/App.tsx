import React from 'react';
import LoginPage from './pages/LoginPage'
import './index.css'

const App: React.FC = () => {
  return (
      <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl">
          <LoginPage/>
      </div>
  );
};

export default App;
