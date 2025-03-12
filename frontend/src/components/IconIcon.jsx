import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faHome} from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const IconIcon = () => {
  return (
    <div className='icon-icon-cont'>
    <button className="icon-icon">
        <i><FontAwesomeIcon icon={faHome} /> </i>
    </button>
    <button className="icon-icon">
        <i><FontAwesomeIcon icon={faHome} /> </i>
    </button>
    </div>
  )
}

export default IconIcon