import React, { useState, useEffect } from "react";
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check local storage for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update the body's class and save theme preference in local storage
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  
  return (
    <div className='header'>
        <h1>Taskedo</h1>
        <div>
          <p>. . . . your daily task writer</p> 
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDarkMode ? <FontAwesomeIcon icon={faLightbulb} />: <FontAwesomeIcon icon={faMoon} />}
          </button>
        </div>
        
           
    </div>
  )
}

export default Header