import React, { createContext, useState, ReactNode } from 'react';
import { ID } from '../types/types';
import mongoose from 'mongoose';

interface UserContextType {
  username: string;
  email: string;
  profilePicture: string;
  id: ID;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setProfilePicture: (profilePicture: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string>('user1');
  const [email, setEmail] = useState<string>('user1@test.com');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [id] = useState<ID>(
    new mongoose.Types.ObjectId('665f9188a3e68b53b3442c59')
  );

  return (
    <UserContext.Provider
      value={{
        username,
        email,
        profilePicture,
        id,
        setUsername,
        setEmail,
        setProfilePicture,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
