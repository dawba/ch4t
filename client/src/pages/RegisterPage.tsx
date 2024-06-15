import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Envelope } from '../assets/envelope_icon.svg';
import useUserAuthentication from '../hooks/useUserAuthentication.ts';
import CustomInput from '../components/customs/CustomInput.tsx';
import NavigationFooter from '../components/customs/NavigationFooter.tsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isAccountActivationShown, setIsAccountActivationShown] =
    useState(false);

  const {
    emailIconState,
    usernameIconState,
    passwordIconState,
    passwordIconTooltip,
    emailIconTooltip,
    usernameIconTooltip,
    handleUserRegistration,
  } = useUserAuthentication({ email, username, password, repeatedPassword });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const response = await handleUserRegistration(email, password);
    const response = await handleUserRegistration(email, username, password);
    // TODO HANDLE RESPONSE SHOW ENVELOPE
    if (response?.data) {
      setIsAccountActivationShown(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="w-48 h-48 mx-auto mb-4" />
      {isAccountActivationShown && (
        <>
          <div
            id="activation-message"
            className="m-4 flex-col items-center justify-center"
          >
            <Envelope className="w-18 h-auto mb-8 mx-auto" />
            <h3 className="text-center">Account created successfully!</h3>
            <h4 className="text-center">
              Check your mailbox to activate your account!
            </h4>
          </div>
          <NavigationFooter path="/login" where="login" />
        </>
      )}
      {!isAccountActivationShown && (
        <form
          id="register-form"
          onSubmit={handleSubmit}
          className="flex flex-col"
          noValidate
        >
          <CustomInput
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            iconState={emailIconState}
            iconTooltip={emailIconTooltip}
            inputWithIcon
          />
          <CustomInput
            type="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            iconState={usernameIconState}
            iconTooltip={usernameIconTooltip}
            inputWithIcon
          />
          <CustomInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            inputWithIcon
            iconState={passwordIconState}
            iconTooltip={passwordIconTooltip}
          />
          <CustomInput
            type="password"
            value={repeatedPassword}
            onChange={handleRepeatedPasswordChange}
            placeholder="Repeat password"
            inputWithIcon
            iconState={passwordIconState}
            iconTooltip={passwordIconTooltip}
          />

          <NavigationFooter path="/login" where="login" />

          <button
            className="bg-primary-yellow mt-12 w-52 mx-auto h-8 rounded-xl hover:opacity-80 text-black"
            type="submit"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
