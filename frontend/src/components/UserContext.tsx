import React, { createContext, useContext, useState, ReactNode } from "react";

// Partage des informations de l'utilisateur à travers l'ensemble de l'application

// UserContext : Le contexte qui contient les informations de l'utilisateur.
// UserProvider : Le fournisseur de contexte qui englobe les composants nécessitant accès à user.
// useUser : Permet à un composant d'accéder aux données du contexte UserContext.

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
