import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false); // Fix here
    const [user, setUser] = useState(null); // Add user state separately
    const [profile, setProfile] = useState({ name: '', email: '' });

  // Function to check if the token is valid
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000; // Convert expiration time to milliseconds
      return Date.now() < expiration; // Check if token is expired
    } catch (error) {
      return false;
    }
  };

  // Function to fetch user profile from the API
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Fix: using the correct key
    const userId = localStorage.getItem('userId');
    
    if (token && isTokenValid(token)) {
        setLoggedIn(true);
        fetchUserProfile(userId,token);
    } else {
        localStorage.removeItem('jwtToken'); // Remove invalid or expired token
        setLoggedIn(false);
    }
}, []);

  // Function to handle login
  const login = (token, userId) => {
    if (token && userId) {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', userId);
        setLoggedIn(true);
        setUser({ token, userId });
    }
};

  
  
  

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
    setUser(null); 
    setProfile({ name: '', email: '' });
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, profile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
