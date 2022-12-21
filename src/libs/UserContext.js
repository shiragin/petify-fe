import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const [loginShow, setLoginShow] = useState({ show: false, type: 'signup' });

  return (
    <UserContext.Provider value={{ loginShow, setLoginShow }}>
      {children}
    </UserContext.Provider>
  );
}
