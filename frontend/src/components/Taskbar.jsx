import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';

const Taskbar = ({ id, title, details, start, selectedDate, priority }) => {
    const navigate = useNavigate();

    const getBorderColor = (priority) => {
        switch(priority) {
            case 'High':
                return 'red'; 
            case 'Medium':
                return 'orange'; 
            case 'Low':
                return 'green'; 
            case 'None':
                return 'black'; 
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        };

        try {
          const response = await fetch(`/api/MarkTasks/${id}`, requestOptions);
    
          if (!response.ok) {
            console.log("Something went wrong when updating the task.");
          } else {
            window.location.reload(); 
          }
        } catch (error) {
          console.log("An error occurred while updating the task.");
        }
      };

    return (
        <div className='simpFlexRow'>
            <div
                className="task-container"
                onClick={() => navigate(`/tasks/${id}`)}
                style={{
                    border: `3px solid ${getBorderColor(priority)}` 
                }}
            >
                <div className="left-section">
                    <h3 className="task-title">{title}</h3>
                    <p className="task-details">{details}</p>
                </div>

                <div className="right-section">
                    <p className="task-time">{start}</p>
                    <p className="task-created-at">{selectedDate}</p> 
                </div> 
            </div>
            <button className="complete-btn" onClick={handleUpdateTask}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
        </div>
    );
}

export default Taskbar;
