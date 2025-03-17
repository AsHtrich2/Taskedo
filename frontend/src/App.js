import './App.css';
import {React, useState, useEffect} from 'react';
import Header from './components/Header';
import ButtonIcon from './components/ButtonIcon';
// import IconIcon from './components/IconIcon';
import Taskbar from './components/Taskbar';
import { faCalendarAlt, faCalendarCheck, faPlus,faList, faCalendarDay } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';

function App() {
  const [taskData, setTaskData] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const [option, setOption] = useState('ptasks');
  const [statData, setStatData] = useState({ pendingTasks: 0, completedTasks: 0 , totalTasks: 0, totaltoday : 0});
  const navigate = useNavigate();
  const getStats = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/api/stats`, requestOptions);
    if (!response.ok) {
      console.log("Something went wrong. Couldn't load the tasks");
    } else {
      const data = await response.json();
      setStatData(data); 
    }
  };
  useEffect(() => {
    getStats();
  }, [option]);

  const getTasks = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/api/${option}`, requestOptions);
    if (!response.ok) {
      console.log("Something went wrong. Couldn't load the tasks");
    } else {
      const data = await response.json();
      setTaskData(data); 
    }
  };

  useEffect(() => {
    getTasks();
  }, [option]);

  const formatTime = (timeString) => {
    if (!timeString) return ''; 
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const getButtonStyle = (buttonOption) => {
    if (option === buttonOption) {
      return {
        backgroundColor: '#f5f5dc', 
        color: '#000', 
        border: '2px solid #000', 
      };
    }
    return {};
  };

  return (
    <div className="App">
      <Header />
      <div className='FirstCont'>
        <div className='LeftCont'>
        <div onClick={()=>setOption(`ttasks/${today}`)}>
        <ButtonIcon icon={faCalendarDay} text={`Today (${statData.totaltoday})`} style={getButtonStyle(`ttasks/${today}`)} />
        </div>
        <div onClick={()=>setOption('ptasks')}>
        <ButtonIcon icon={faCalendarAlt} text={`Pending (${statData.pendingTasks})`} style={getButtonStyle('ptasks')}  />
        </div>
        <div onClick={()=>setOption('ctasks')}>
        <ButtonIcon icon={faCalendarCheck} text={`Completed(${statData.completedTasks})`} style={getButtonStyle('ctasks')} />
        </div>
        <div onClick={()=>setOption('atasks')}>
        <ButtonIcon icon={faList} text={`All Tasks (${statData.totalTasks - 1})`} style={getButtonStyle('atasks')} />
        </div>
        
        </div>
        <div className='RightCont'>
        <div className='TopButtonCont TopButtonContSpec'>
          
          <div className='TopButtonContRight'>
            {/* <IconIcon /> */}
            <div onClick={() => navigate("/newtask")}>
              <ButtonIcon icon={faPlus} text="Create new task" />
            </div>
          </div>
        </div>
        <div className='SecCont SecContSpec'>
          {taskData.map((task, index) => (
        
            <Taskbar 
              id={task.taskID}
              title={task.title}
              details={task.details}
              start={formatTime(task.start)} 
              selectedDate={task.selectedDate}
              priority={task.priority}
              status={task.status}
            />
           
          ))}
        </div>
        </div>
        
      </div>        
    </div>
  );
}

export default App;
