import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
    username: string;
    email: string;
    pfp: string;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPfp: (pfp: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('Adam');
    const [email, setEmail] = useState<string>('a@a');
    const [pfp, setPfp] = useState<string>('');

    return (
        <UserContext.Provider value={{ username, email, pfp, setUsername, setEmail, setPfp }}>
            {children}
        </UserContext.Provider>
    );
};
