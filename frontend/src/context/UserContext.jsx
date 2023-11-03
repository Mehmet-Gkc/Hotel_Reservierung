import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const storedLoggedInUser = localStorage.getItem('loggedInUser');

    if (storedLoggedInUser) {
      setLoggedInUser(JSON.parse(storedLoggedInUser));
    }
  }, []);

  const createUser = async (formData) => {
    try {
      const response = await axios.post(`/api/users/register`, formData, {
        withCredentials: true,
      });
      //console.log('res', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(`/api/users/login`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem('loggedInUser', JSON.stringify(userData));

        // Fetch the user data using _id
        const userResponse = await axios.get(`/api/users/me/${userData._id}`, {
          withCredentials: true,
        });

        const loggedInUserData = userResponse.data;

        setIsLoggedIn(true);
        setLoggedInUser(loggedInUserData);
      }
    } catch (error) {
      console.log('error,', error);
      setLoginError('Ungültig Email oder Passsword');
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post('/api/users/logout', {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      localStorage.removeItem('loggedInUser');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        loginUser,
        isLoggedIn,
        setIsLoggedIn,
        logoutUser,
        loggedInUser,
        loginError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
