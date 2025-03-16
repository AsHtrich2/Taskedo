import React, { useState, useEffect } from "react";
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

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