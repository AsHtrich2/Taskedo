import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const ButtonIcon = ({ icon, text }) => {
  return (
    <button className="icon-button" >
      <FontAwesomeIcon icon={icon} /> 
      <div>{text}</div>  
    </button>
  )
}
export default ButtonIcon