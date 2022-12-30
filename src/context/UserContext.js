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

  const [confirmSave, setConfirmSave] = useState();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    bio: '',
    savedPets: [],
    adoptedPets: [],
    fostedPets: [],
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [error, setError] = useState({ show: false, message: '' });

  async function createNewUser(user) {
    try {
      if (user.password !== user.passwordConfirm)
        throw new Error('Passwords must match');
      else {
        const res = await axios.post(`http://localhost:8080/users`, user);
        if (res.status === 201) {
          setLoggedIn(true);
          getUser(user);
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
      const res = await axios.get(`http://localhost:8080/users`, {
        params: { email: user.email },
      });
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { users } = await res.data.data;
      if (users[0].password === user.password) {
        console.log('User validated!');
        setUser(users[0]);
        localStorage.setItem('user', JSON.stringify(users[0]));
        console.log(users[0]);
        console.log(localStorage.getItem('user'));
        setLoggedIn(true);
        return true;
      } else {
        throw new Error('Passwords do not match!');
      }
    } catch (err) {
      return false;
    }
  }

  async function getUserById(id) {
    try {
      console.log('CONTEXT', id);
      const res = await axios.get(`http://localhost:8080/users/${id}`);
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { user } = await res.data.data;
      console.log(user);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (err) {
      return false;
    }
  }

  async function updateUser(id) {
    try {
      const res = await axios.patch(`http://localhost:8080/users/${id}`, user);
      const { user: userDetails } = await res.data.data;
      if (userDetails.password !== userDetails.passwordConfirm)
        throw new Error('Passwords must match');
      setUser(userDetails);
      return res.status === 200 ? true : false;
    } catch (err) {
      console.error(err);
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
        updateUser,
        getUser,
        confirmSave,
        setConfirmSave,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
