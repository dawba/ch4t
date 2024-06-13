import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Envelope } from '../assets/envelope_icon.svg';
import AlertIcon, { AlertIconState } from '../components/AlertIcon.tsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [arePasswordsConsistent, setArePasswordsConsistent] = useState(true);
  const [isEmailValidOrEmpty, setIsEmailValidOrEmpty] = useState(true);
  const [emailIconState, setEmailIconState] =
    useState<AlertIconState>('hidden');
  const [passwordIconState, setPasswordIconState] =
    useState<AlertIconState>('hidden');
  const [emailIconTooltip, setEmailIconTooltip] = useState(
    'Correct email address should be entered'
  );
  const [passwordIconTooltip, setPasswordIconTooltip] = useState(
    'The same password should be entered twice'
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(e.target.value);
  };

  useEffect(() => {
    setArePasswordsConsistent(
      password === repeatedPassword ||
        password === '' ||
        repeatedPassword === ''
    );
  }, [password, repeatedPassword]);

  useEffect(() => {
    if (!arePasswordsConsistent) {
      setPasswordIconState('yellow' as AlertIconState);
      setPasswordIconTooltip('The same password should be entered twice');
    } else {
      setPasswordIconState('hidden' as AlertIconState);
    }
  }, [arePasswordsConsistent]);

  useEffect(() => {
    setIsEmailValidOrEmpty(emailRegex.test(email) || email === '');
  }, [email]);

  useEffect(() => {
    if (!isEmailValidOrEmpty) {
      setEmailIconState('yellow' as AlertIconState);
      setEmailIconTooltip('Correct email address should be entered');
    } else {
      setEmailIconState('hidden' as AlertIconState);
    }
  }, [isEmailValidOrEmpty]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (arePasswordsConsistent && isEmailValidOrEmpty && email !== '') {
      const registerForm = document.getElementById('register-form')!;
      const activationMessage = document.getElementById('activation-message')!;
      registerForm.style.visibility = 'hidden';
      activationMessage.style.display = 'block';
    } else {
      if (
        !arePasswordsConsistent ||
        password === '' ||
        repeatedPassword === ''
      ) {
        setPasswordIconState('red' as AlertIconState);
        if (password === '' && repeatedPassword === '') {
          setPasswordIconTooltip('Password is required');
        }
      }
      if (!isEmailValidOrEmpty || email === '') {
        setEmailIconState('red' as AlertIconState);
        if (email === '') {
          setEmailIconTooltip('Email is required');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        id="activation-message"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 hidden flex-col items-center justify-center"
      >
        <Envelope className="w-18 h-auto mb-8 mx-auto" />
        <h4>Check your mailbox to activate your account</h4>
      </div>
      <form
        id="register-form"
        onSubmit={handleSubmit}
        className="flex flex-col"
        noValidate
      >
        <Logo className="w-48 h-48 mx-auto mb-4" />
        <div className="inline-flex items-center mt-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="inline-block w-80 ml-12 mr-2"
          />
          <AlertIcon
            state={emailIconState}
            className="w-8 h-8 mr-2 inline-block"
            tooltip={emailIconTooltip}
          />
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="w-80 mt-4 mx-auto"
        />
        <div className="inline-flex items-center mt-2">
          <input
            type="password"
            id="repeatPassword"
            value={repeatedPassword}
            onChange={handleRepeatedPasswordChange}
            placeholder="Repeat password"
            className="inline-block w-80 ml-12 mr-2"
          />
          <AlertIcon
            state={passwordIconState}
            className="w-8 h-8 mr-2 inline-block"
            tooltip={passwordIconTooltip}
          />
        </div>
        <button
          className="bg-primary-yellow mt-12 w-52 mx-auto h-8 rounded-xl hover:opacity-80 text-black"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
