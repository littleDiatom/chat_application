import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUserName, setCurrentUserName] = useState<string>("");

  return (
    <UserContext.Provider value={{ currentUserName, setCurrentUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
