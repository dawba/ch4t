import React, {
    ReactNode,
    createContext,
    useContext,
    Dispatch,
    SetStateAction, useState,
} from 'react';
import { ID } from '../../types/types.ts';

interface UserContextType {
  username: string;
  email: string;
  profilePicture: string;
  userId: ID | null;
  setUserId: Dispatch<SetStateAction<ID | null>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setProfilePicture: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  username: '',
  email: '',
  profilePicture: '',
  userId: null,
  setUsername: () => {},
  setUserId: () => {},
  setEmail: () => {},
  setProfilePicture: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [userId, setUserId] = useState<ID | null>(null);

  return (
    <UserContext.Provider
      value={{
        username,
        email,
        profilePicture,
        userId,
        setUsername,
        setUserId,
        setEmail,
        setProfilePicture,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
