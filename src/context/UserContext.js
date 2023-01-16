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

  const baseURL = 'http://localhost:8080';

  async function createNewUser(user) {
    try {
      const res = await axios.post(`${baseURL}/users/signup`, user, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { userId, exp } = res.data;
        const currentUser = await getUserProfile(userId);
        setUserId(userId);
        setUser(currentUser);
        console.log(userId, exp);
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
        `${baseURL}/users/login`,
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        const { userId, exp } = await res?.data;
        const currentUser = await getUserProfile(userId);
        setUserId(userId);
        setUser(currentUser);
        localStorage.setItem('userId', userId);
        localStorage.setItem('exp', exp);
        console.log('HELLO', user.email, userId, exp);
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
      const res = await axios.get(`${baseURL}/users/${id}`);
      if (res?.data?.ok) {
        const { user: userDetails } = await res?.data;
        return userDetails;
      }
    } catch (err) {
      console.error(error);
      return false;
    }
  }

  async function updateUser(id) {
    try {
      const res = await axios.put(`${baseURL}/users/${id}`, user, {
        withCredentials: true,
      });

      if (res?.data?.ok) {
        const { user: userDetails } = await res?.data;
        setUser(userDetails);
        return res.data.ok;
      }
    } catch (err) {
      return err.response.data;
    }
  }

  async function getAllUsers() {
    try {
      const res = await axios.get(`${baseURL}/users`);
      if (!res?.data?.ok) throw new Error('No such user!');
      const { users } = await res.data;
      if (res.data.ok) return users;
    } catch (err) {
      return false;
    }
  }

  async function getAllQueries() {
    try {
      const res = await axios.get(`${baseURL}/queries`);
      if (!res?.data?.ok) throw new Error('No queries!');
      const { queries } = await res.data;
      if (res.data.ok) return queries;
    } catch (err) {
      console.log(err);
    }
  }

  async function getQueriesbyUserId(userId) {
    try {
      const res = await axios.get(`${baseURL}/queries/users/${userId}`);
      if (!res?.data?.ok) throw new Error('No query by this ID!');
      else {
        const { queries } = await res?.data;
        return queries;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getQuery(id) {
    try {
      const res = await axios.get(`${baseURL}/queries/${id}`);
      if (!res?.data?.ok) throw new Error('No query by this ID!');
      else {
        const { queries } = await res?.data;
        return queries;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function createNewQuery(query) {
    try {
      console.log('CONTEXT', query);
      const res = await axios.post(`${baseURL}/queries`, query, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { query: newQuery } = await res?.data;
        return { ok: true, query: newQuery };
      }
    } catch (err) {
      const { message } = await err?.response?.data;
      return { ok: false, error: message };
    }
  }

  async function updateQuery(id, update) {
    try {
      const res = await axios.patch(`${baseURL}/queries/${id}/reply`, update, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { query: newQuery } = await res?.data;
        return { ok: true, query: newQuery };
      }
    } catch (err) {
      const { message } = await err?.response?.data;
      return { ok: false, error: message };
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
        createNewQuery,
        getAllQueries,
        getQueriesbyUserId,
        getQuery,
        updateQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
