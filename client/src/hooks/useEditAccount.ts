import { ChangeEvent, useCallback, useState } from 'react';
import UserRepository from '../api/UserRepository.ts';
import { ID } from '../types/types.ts';

type EditAccountCredentials = {
  userId: ID;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  initialCredentials: {
    userId: ID;
    email: string;
    username: string;
  };
};

export type Errors = {
  [key: string]: string;
};

const useEditAccount = (userId: ID, email: string, username: string) => {
  const [credentials, setCredentials] = useState<EditAccountCredentials>({
    userId: userId,
    email: email,
    username: username,
    password: '',
    confirmPassword: '',
    initialCredentials: {
      userId: userId,
      email: email,
      username: username,
    },
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<boolean>(false);

  const setEmail = (email: string) => {
    setCredentials({ ...credentials, email });
  };

  const setUsername = (username: string) => {
    setCredentials({ ...credentials, username });
  };

  const setPassword = (password: string) => {
    setCredentials({ ...credentials, password });
  };

  const setConfirmPassword = (confirmPassword: string) => {
    setCredentials({ ...credentials, confirmPassword });
  };

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  const handleChangeCredentials = useCallback(async () => {
    const { userId, email, username, password, confirmPassword } = credentials;
    let currentErrors = {};

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      newErrors.authentication = '';

      if (!email) {
        newErrors.email = 'Email is required';
      } else {
        delete newErrors.email;
      }

      if (!username) {
        newErrors.username = 'Username is required';
      } else {
        delete newErrors.username;
      }

      if (!password) {
        newErrors.password = 'Password is required';
      } else {
        delete newErrors.password;
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else {
        delete newErrors.confirmPassword;
      }

      if (password && confirmPassword && password !== confirmPassword) {
        newErrors.password = 'Passwords do not match';
      } else if (password && confirmPassword && password === confirmPassword) {
        delete newErrors.password;
      }

      currentErrors = newErrors;

      return newErrors;
    });

    console.log('errors', errors);

    if (Object.keys(errors).length === 0) {
      const byUsername =
        username !== credentials.initialCredentials.username &&
        (await UserRepository.getUserByUsername(username));

      const byEmail =
        email !== credentials.initialCredentials.email &&
        (await UserRepository.getUserByEmail(email));

      const isUsernameTaken = byUsername && Object.keys(byUsername).length > 0;
      const isEmailTaken = byEmail && Object.keys(byEmail).length > 0;

      if (isUsernameTaken) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Username is already taken',
        }));
      }

      if (isEmailTaken) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email is already taken',
        }));
      }

      if (!isUsernameTaken && !isEmailTaken) {
        const response = await UserRepository.updateUser(
          userId,
          email,
          username,
          password
        );

        const { data, message } = response;

        if (Object.keys(data).length > 0) {
          setSuccess(true);
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            authentication: message,
          }));
        }
      }
    }
  }, [credentials, setErrors]);

  return {
    credentials,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleChangeCredentials,
    errors,
    success,
  };
};

export default useEditAccount;
