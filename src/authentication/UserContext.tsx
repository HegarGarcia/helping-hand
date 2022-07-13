import { createContext, ReactNode, useState } from "react";

interface Context {
  user: firebase.User;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
}

export const UserContext = createContext<Context>({
  user: null,
  setUser: null,
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<firebase.User>(null);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}
