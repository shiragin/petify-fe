import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const [loginModalShow, setLoginModalShow] = useState({
    show: false,
    type: 'signup',
  });

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [error, setError] = useState({ show: false, message: '' });

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
      return false;
    }
  }

  async function getUser(user) {
    try {
      console.log(user);
      const res = await axios.get(`http://localhost:8080/users`, {
        params: { email: user.email },
      });
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { users } = await res.data.data;
      console.log(users[0]);
      if (users[0].password === user.password) {
        console.log('User validated!');
        setUser(users[0]);
        setLoggedIn(true);
        return true;
      } else {
        throw new Error('Passwords do not match!');
      }
    } catch (err) {
      // setError({ show: true, message: err });
      return false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        loginModalShow,
        setLoginModalShow,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        createNewUser,
        loginForm,
        setLoginForm,
        getUser,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
