import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const [loginShow, setLoginShow] = useState({ show: false, type: 'signup' });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  async function createNewUser(user) {
    try {
      if (user.password !== user.passwordConfirm)
        throw new Error('Passwords must match');
      else {
        const res = await axios.post(`http://localhost:8080/users`, {
          ...user,
        });
        if (res.status === 201) {
          setLoggedIn(true);
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        loginShow,
        setLoginShow,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        createNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
