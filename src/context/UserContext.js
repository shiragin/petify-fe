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

  // const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [user, setUser] = useState(
    localStorage.getItem('user') ||
      //   {
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   phoneNumber: '',
      //   password: '',
      //   passwordConfirm: '',
      //   bio: '',
      //   savedPets: [],
      //   adoptedPets: [],
      //   fosteredPets: [],
      // }
      null
  );

  const [loggedIn, setLoggedIn] = useState(false);

  const [error, setError] = useState({ show: false, message: '' });

  async function createNewUser(user) {
    try {
      const res = await axios.post(`http://localhost:8080/users/signup`, user);
      if (res?.data?.ok) {
        setLoggedIn(true);
        getUser(user);
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
        const { user: userData, exp } = await res.data.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        // localStorage.setItem('token', token);
        // localStorage.setItem('exp', exp);
        console.log('HELLO', userData, exp);
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
      console.log(error);
      return false;
    }
  }

  async function updateUser(id) {
    console.log('USER UPDATE!', user);
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
        // getUserById,
        getAllUsers,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
