import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const ButtonIcon = ({ icon, text, style }) => {
  return (
    <button className="icon-button" style={style}>
      <FontAwesomeIcon icon={icon} /> 
      <div>{text}</div>  
    </button>
  )
}

export default ButtonIcon;
