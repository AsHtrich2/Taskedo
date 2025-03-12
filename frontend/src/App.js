import './App.css';
import {React, useState, useEffect} from 'react';
import Header from './components/Header';
import ButtonIcon from './components/ButtonIcon';
// import IconIcon from './components/IconIcon';
import Taskbar from './components/Taskbar';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
// import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';

function App() {
  const [taskData, setTaskData] = useState([]);
  const [statData, setStatData] = useState({ pendingTasks: 0, completedTasks: 0 , totalTasks: 0});

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

  const getTasks = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
    const response = await fetch("/api/tasks", requestOptions);
    if (!response.ok) {
      console.log("Something went wrong. Couldn't load the tasks");
    } else {
      const data = await response.json();
      setTaskData(data); 
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) return ''; 
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <Header />
      <div className='FirstCont'>
        <div className='TopButtonCont'>
          <div className='TopButtonContLeft'>
            <ButtonIcon icon={faHome} text={`${statData.pendingTasks} Pending`} />
            <ButtonIcon icon={faHome} text={`${statData.completedTasks} Completed`} />
          </div>
          <div className='TopButtonContRight'>
            {/* <IconIcon /> */}
            <Link to="/newtask">
              <ButtonIcon icon={faHome} text="New task" />
            </Link>
          </div>
        </div>
        <div className='SecCont'>
          {taskData.map((task, index) => (
            
            <Taskbar 
              id={task.taskID}
              title={task.title}
              details={task.details}
              start={formatTime(task.start)} 
              selectedDate={task.selectedDate}
              priority={task.priority}
            />
           
          ))}
        </div>
      </div>        
    </div>
  );
}

export default App;
