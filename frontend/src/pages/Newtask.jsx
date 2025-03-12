import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ButtonIcon from '../components/ButtonIcon';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Newtask() {
  const navigate = useNavigate();
  const [statData, setStatData] = useState({ pendingTasks: 0, completedTasks: 0 , totalTasks: 0});
  const [formData, setFormData] = useState({
    taskID: 0,
    title: '',
    details: '',
    createDate: new Date().toISOString().split('T')[0], 
    selectedDate: new Date().toISOString().split('T')[0], 
    start: '',
    end: '',
    priority: '',
    status:'Pending',
  });

  const getStats = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      };
      const response = await fetch("/api/stats", requestOptions);
      if (!response.ok) {
        console.log("Something went wrong. Couldn't load the tasks");
      } else {
        const data = await response.json();
        setStatData(data); 
      }
    };
  
    useEffect(() => {
      getStats();
    }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "taskID": 0,
        "title": formData.title,
        "details": formData.details,
        "priority": formData.priority,
        "createDate": formData.createDate,
        "selectedDate": formData.selectedDate,
        "start": formData.start,
        "end": formData.end,
        "status": formData.status
      }),
      };

    try {
      const response = await fetch("/api/tasks", requestOptions);

      if (!response.ok) {
        console.log("Something went wrong when creating a task.");
      } else {
          navigate(-1);
      }
    } catch (error) {
      console.log("An error occurred while creating a task.");
     
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };

  const handlePriorityClick = (priority) => {
    setFormData((prevState) => ({
      ...prevState,
      priority, 
    }));
  };

  return (
    <div className="App">
      <Header />
      <div className="FirstCont">
        <div className="TopButtonCont">
          <div className="TopButtonContLeft">
            <ButtonIcon icon={faHome} text={`Task no ${statData.totalTasks}`} />
          </div>
          <div className="TopButtonContRight">
            <Link to="/">
              <ButtonIcon icon={faHome} text="Discard" />
            </Link>
            
            <Link to="/">
            <div onClick={handleCreateTask}><ButtonIcon icon={faHome} text="Add task" /></div>
            </Link>
          </div>
        </div>
        <div className="SecCont">
          {/* Title */}
          <div className="line-container">
            <span className="line-text">Title</span>
            <hr className="horizontal-line" />
          </div>
          <div className="simpFlexRow">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="inputBox"
              placeholder="Enter title..."
            />
          </div>

          {/* Details */}
          <div className="line-container">
            <span className="line-text">Details</span>
            <hr className="horizontal-line" />
          </div>
          <div className="simpFlexRow">
            <textarea
              name="details"
              rows="6"
              cols="50"
              value={formData.details}
              onChange={handleInputChange}
              className="textBox"
              placeholder="Add details..."
            />
          </div>

          {/* Time */}
          <div className="line-container">
            <span className="line-text">Time</span>
            <hr className="horizontal-line" />
          </div>
          <div className="simpFlexRow">
            <input
              type="date"
              name="selectedDate"
              value={formData.selectedDate}
              onChange={handleInputChange}
              className="dateButton"
            />
            <div className="time-input-container">
              <div className="time-input-wrapper">
                <input
                  type="time"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  className="time-input"
                />
              </div>
              <p>to</p>
              <div className="time-input-wrapper">
                <input
                  type="time"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  className="time-input"
                />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="line-container">
            <span className="line-text">Priority</span>
            <hr className="horizontal-line" />
          </div>
          <div className="button-container">
            {['High', 'Medium', 'Low', 'None'].map((priority) => (
              <button
                key={priority}
                className={`button ${formData.priority === priority ? 'selected' : ''}`}
                onClick={() => handlePriorityClick(priority)}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newtask;
