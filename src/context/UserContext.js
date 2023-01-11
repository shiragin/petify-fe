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

  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

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
      const res = await axios.post(`http://localhost:8080/users/signup`, user, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { userId, exp } = res.data.data;
        const currentUser = await getUserProfile(userId);
        setUserId(userId);
        setUser(currentUser);
        localStorage.setItem('userId', userId);
        localStorage.setItem('exp', exp);
        setLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      const { message } = error.response.data;
      return message;
    }
  }

  async function getUser(user) {
    try {
      const res = await axios.post(
        `http://localhost:8080/users/login`,
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        const { userId, exp } = await res.data.data;
        const currentUser = await getUserProfile(userId);
        setUserId(userId);
        setUser(currentUser);
        localStorage.setItem('userId', userId);
        // localStorage.setItem('token', token);
        localStorage.setItem('exp', exp);
        console.log('HELLO', user, userId, exp);
        setLoggedIn(true);
        return true;
      }
    } catch (error) {
      const { message } = await error?.response?.data;
      return message;
    }
  }

  async function getUserProfile(id) {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`);
      if (res?.data?.ok) {
        const { user: userDetails } = await res.data.data;
        return userDetails;
      }
    } catch (err) {
      console.error(error);
      return false;
    }
  }

  async function updateUser(id) {
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${id}`,
        user,
        // headers: { authorization: `Bearer ${token}` },
        { withCredentials: true }
      );

      if (res?.data?.ok) {
        const { user: userDetails } = await res.data.data;
        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
        return res.data.ok;
      }
    } catch (err) {
      return err.response.data;
    }
  }

  async function getAllUsers() {
    try {
      const res = await axios.get(`http://localhost:8080/users`);
      if (!res?.data?.ok) throw new Error('No such user!');
      const { users } = await res.data.data;
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
        userId,
        setUserId,
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
        getAllUsers,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
