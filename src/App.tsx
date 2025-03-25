import { useEffect, useState } from 'react' 
import './App.css'
import axios from 'axios'
import {HOST} from "./constants"
import { Task } from './model/task';
import TaskCard from './components/task';

function App() { 
  const [taskList, setTaskList] = useState<Task[]>([]);
  
  const fetch_all_tasks = async () => {

    const response = await axios.get(`${HOST}/tasks`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,  
      },
    });

    const result = await response.data; 
    console.log(result);
    setTaskList(result); 
  }

  useEffect(()=> {
    fetch_all_tasks(); 
  }, [])

  return (
    <> 
      {taskList.map((ele, index) => ( 
          <TaskCard 
              key={index}
              id={ele.id} 
              title={ele.title}
              description={ele.description}
              is_completed={ele.is_completed}
            />
      ))}
    </>
  )
}

export default App
