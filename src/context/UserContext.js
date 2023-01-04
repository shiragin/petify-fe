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

  const [token, setToken] = useState(localStorage.getItem('token') || '');

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
    fosteredPets: [],
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [error, setError] = useState({ show: false, message: '' });

  async function createNewUser(user) {
    try {
      const res = await axios.post(`http://localhost:8080/users/signup`, user);
      if (res.status === 201) {
        setLoggedIn(true);
        getUser(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  }

  async function getUser(user) {
    try {
      const res = await axios.post(`http://localhost:8080/users/login`, {
        email: user.email,
        password: user.password,
      });
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { user: userData, token, exp } = await res.data.data;
      setToken(token);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('exp', exp);
      console.log('HELLO', userData, token, exp);
      setLoggedIn(true);
      return true;
    } catch (error) {
      return error.response.data;
    }
  }

  async function getUserById(id) {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`);
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { user } = await res.data.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (err) {
      return false;
    }
  }

  async function getUserProfile(id) {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`);
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { user: userDetails } = await res.data.data;
      // setUser(user);
      // localStorage.setItem('user', JSON.stringify(user));
      return userDetails;
    } catch (err) {
      return false;
    }
  }

  async function updateUser(id) {
    try {
      const res = await axios.patch(`http://localhost:8080/users/${id}`, user, {
        headers: { authorization: `Bearer ${token}` },
      });
      const { user: userDetails } = await res.data.data;
      setUser(userDetails);
      return res.data.ok;
    } catch (err) {
      console.error(err.response.data);
      return false;
    }
  }

  async function getAllUsers() {
    try {
      const res = await axios.get(`http://localhost:8080/users`);
      if (!res.statusText === 'ok') throw new Error('No such user!');
      const { users } = await res.data.data;
      console.log(res.data);
      console.log(res.data.ok);
      console.log(users);
      if (res.data.ok) return users;
      return true;
    } catch (err) {
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
        token,
        setToken,
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
        getAllUsers,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
