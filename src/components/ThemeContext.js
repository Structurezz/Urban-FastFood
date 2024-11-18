import React, { createContext, useContext, useState } from 'react';

// Creating the context for the theme
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext); // Custom hook to use theme context
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default theme

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
