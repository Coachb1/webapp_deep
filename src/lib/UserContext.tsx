"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type User = {
  userId: string;
  username: string;
  useremail: string;
};

type UserContextType = {
  loggedInUser?: User;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<any>(undefined);

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [loggedInUser, setLoggedInUser] = useState<User>({
    userId: "",
    username: "",
    useremail: "",
  });

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
