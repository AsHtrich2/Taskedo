import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faUndo} from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';

const Taskbar = ({ id, title, details, start, selectedDate, priority, status }) => {
    const navigate = useNavigate();
    const getBorderColor = (priority) => {
        switch(priority) {
            case 'High':
                return '#DEAA79';  
            case 'Medium':
                return '#FADA7A';  
            case 'Low':
                return '#BAD8B6';  
            case 'None':
                return '#C5D3E8';  
        }    
        // switch(priority) {
        //     case 'High':
        //         return '#554e4c';  
        //     case 'Medium':
        //         return '#b0a0a4';  
        //     case 'Low':
        //         return '#a0a4b0';  
        //     case 'None':
        //         return '#a1b3af';  
        // }    
        // switch(priority) {
        //     case 'High':
        //         return '#554e4c';  
        //     case 'Medium':
        //         return '#94a5a2';  
        //     case 'Low':
        //         return '#9497a5';  
        //     case 'None':
        //         return '#a5a294';  
        // }         
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        };
        
        const endpoint = status === 'Completed' ? `/api/UnMarkTasks/${id}` : `/api/MarkTasks/${id}`; 
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}${endpoint}`, requestOptions);
    
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
                    borderLeft: `10px solid ${getBorderColor(priority)}`, 
                    borderRight: `10px solid ${getBorderColor(priority)}` ,
                    borderTop: `3px solid ${getBorderColor(priority)}`, 
                    borderBottom: `3px solid ${getBorderColor(priority)}` 
                }}
            >
                <div className="left-section">
                    <div className='tags'>
                        <p className='task-priority' style={{
                        background: `${getBorderColor(priority)}` ,color: 'black',
                    }}>{priority}</p>
                        <p className='task-status' style={{
                            background: `${getBorderColor(priority)}` ,color: 'black',
                        }}>{status}</p>
                    </div>
                   
                    <h3 className="task-title">{title}</h3>
                    <p className="task-details">{details}</p>
                </div>

                <div className="right-section">
                    <p className="task-time">{start}</p>
                    <p className="task-created-at">{selectedDate}</p> 
                </div> 
            </div>
            <button className="complete-btn" onClick={handleUpdateTask}>
                <FontAwesomeIcon icon={status === 'Completed' ? faUndo : faCheck} />
            </button>
        </div>
    );
}

export default Taskbar;
