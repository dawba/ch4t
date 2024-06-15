import { useEffect, useState } from 'react';
import { AlertIconState } from '../types/types.ts';

interface Props {
  email: string | null;
  username: string | null;
  password: string;
  repeatedPassword?: string;
}

const useUserAuthentication = ({
  email,
  username,
  password,
  repeatedPassword = undefined,
}: Props) => {
  const [arePasswordsConsistent, setArePasswordsConsistent] = useState(true);
  const [isEmailValidOrEmpty, setIsEmailValidOrEmpty] = useState(true);

  const [emailIconState, setEmailIconState] =
    useState<AlertIconState>('hidden');
  const [usernameIconState, setUsernameIconState] =
    useState<AlertIconState>('hidden');
  const [passwordIconState, setPasswordIconState] =
    useState<AlertIconState>('hidden');

  const emailTooltip = 'Correct email address should be entered';

  const [emailIconTooltip, setEmailIconTooltip] = useState('');
  const [usernameIconTooltip, setUsernameIconTooltip] = useState('');
  const [passwordIconTooltip, setPasswordIconTooltip] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setArePasswordsConsistent(
      password === repeatedPassword ||
        password === '' ||
        repeatedPassword === ''
    );
  }, [password, repeatedPassword]);

  useEffect(() => {
    if (!arePasswordsConsistent && repeatedPassword !== undefined) {
      setPasswordIconState('yellow' as AlertIconState);
      setPasswordIconTooltip('The same password should be entered twice');
    } else {
      setPasswordIconState('hidden' as AlertIconState);
    }
  }, [arePasswordsConsistent]);

  useEffect(() => {
    if (email == null) {
      return;
    }

    setIsEmailValidOrEmpty(emailRegex.test(email) || email === '');
  }, [email]);

  useEffect(() => {
    if (!isEmailValidOrEmpty) {
      setEmailIconState('yellow' as AlertIconState);
      setEmailIconTooltip(emailTooltip);
    } else if (email === '' && emailIconTooltip) {
      setEmailIconState('red' as AlertIconState);
      setEmailIconTooltip('Email is required');
    } else {
      setEmailIconState('hidden' as AlertIconState);
    }
  }, [isEmailValidOrEmpty]);

  useEffect(() => {
    if (
      usernameIconState !== 'hidden' &&
      username !== '' &&
      usernameIconTooltip
    ) {
      setUsernameIconState('hidden' as AlertIconState);
      return;
    }

    if (username === '' && usernameIconTooltip) {
      setUsernameIconState('red' as AlertIconState);
    }
  }, [username, usernameIconState, usernameIconTooltip]);

  const checkAndSetEmailState = (userEmail: string | null) => {
    if (userEmail === null) {
      return;
    }

    if (!isEmailValidOrEmpty || userEmail === '') {
      setEmailIconState('red' as AlertIconState);
      if (userEmail === '') {
        setEmailIconTooltip('Email is required');
      }
    } else {
      setEmailIconState('hidden' as AlertIconState);
    }
  };

  const checkAndSetUsernameState = (username: string) => {
    if (username === '') {
      setUsernameIconState('red' as AlertIconState);
      setUsernameIconTooltip('Username is required');
    }
  };

  const checkAndSetPasswordState = (
    userPassword: string,
    repeatedUserPassword?: string
  ) => {
    console.log('Check and set password state');
    if (
      userPassword === '' ||
      repeatedUserPassword === '' ||
      !arePasswordsConsistent
    ) {
      console.log('inside');
      setPasswordIconState('red' as AlertIconState);

      if (
        userPassword === '' &&
        (repeatedUserPassword === '' || repeatedUserPassword === undefined)
      ) {
        setPasswordIconTooltip('Password is required');
      } else {
        setPasswordIconTooltip('Passwords must match');
      }

      return;
    }
  };

  const handleUserRegistration = async (
    userEmail: string,
    username: string,
    userPassword: string
  ) => {
    if (
      arePasswordsConsistent &&
      isEmailValidOrEmpty &&
      userEmail !== '' &&
      username !== ''
    ) {
      try {
        const response = await fetch(
          'http://localhost:5050/api/user/register',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userEmail,
              username,
              password: userPassword,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('User registered:', data);
          return { message: data.message, data: data.user };
        } else {
          console.log('Network response was not [ok]');
          return { message: 'Network response was not [ok]', data: null };
        }
      } catch (error) {
        console.error('Failed to register:', error);
        return { message: 'Failed to register:', data: null };
      }
    } else {
      checkAndSetPasswordState(password, repeatedPassword);
      checkAndSetEmailState(email);
      checkAndSetUsernameState(username);
    }
  };

  const handleUserLogin = async (username: string, userPassword: string) => {
    if (username !== '' && userPassword !== '') {
      try {
        const response = await fetch('http://localhost:5050/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password: userPassword }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return { message: 'User logged in:', data };
        } else {
          return { message: 'Network response was not [ok]', data: null };
        }
      } catch (error) {
        console.error('Failed to login:', error);
        return { message: 'Failed to login:', data: null };
      }
    }

    checkAndSetPasswordState(password, undefined);
    checkAndSetUsernameState(username);

    return { message: 'Incorrect form data', data: null };
  };

  return {
    emailIconState,
    passwordIconState,
    usernameIconState,
    emailIconTooltip,
    passwordIconTooltip,
    usernameIconTooltip,

    arePasswordsConsistent,

    setEmailIconState,
    setPasswordIconState,
    setEmailIconTooltip,
    setPasswordIconTooltip,
    setArePasswordsConsistent,

    handleUserRegistration,
    handleUserLogin,
  };
};

export default useUserAuthentication;
