import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../types/types.ts';
import useUserAuthentication from '../hooks/useUserAuthentication.ts';
import CustomInput from '../components/customs/CustomInput.tsx';
import NavigationFooter from '../components/customs/NavigationFooter.tsx';
import { checkEmptyObject } from '../utils/checkEmptyObject.ts';

const LoginPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const {
    usernameIconState,
    usernameIconTooltip,
    passwordIconState,
    passwordIconTooltip,
    handleUserLogin,
  } = useUserAuthentication({
    email: null,
    username: credentials.username,
    password: credentials.password,
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevCredentials) => ({
      password: prevCredentials.password,
      username: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevCredentials) => ({
      username: prevCredentials.username,
      password: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleUserLogin(
      credentials.username,
      credentials.password
    );

    if (!checkEmptyObject(response.data)) {
      console.log('Logged in successfully');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
        <Logo className="w-48 h-48 mx-auto mb-4" />
        <CustomInput
          type="username"
          value={credentials.username}
          onChange={handleUsernameChange}
          placeholder="Username"
          iconState={usernameIconState}
          iconTooltip={usernameIconTooltip}
          inputWithIcon
        />
        <CustomInput
          type="password"
          value={credentials.password}
          onChange={handlePasswordChange}
          placeholder="Password"
          inputWithIcon
          iconState={passwordIconState}
          iconTooltip={passwordIconTooltip}
        />

        <NavigationFooter path="/register" where="register" />

        <button
          className="bg-primary-yellow mt-12 w-52 mx-auto h-8 rounded-xl hover:opacity-80 text-black"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
