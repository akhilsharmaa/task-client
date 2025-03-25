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

  const handleCreateNewTask = () =>{
    setTaskList((prev) => [
      ...prev,
      { id: 0, title: "your title", description: "write your description", is_completed: false },
    ]);
  }

  useEffect(()=> {
    fetch_all_tasks(); 
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Task Manager Assignment</h1>
        <button
          onClick={handleCreateNewTask}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create New Task
        </button>
      </nav>
  
      {/* Main Content */}
      <main className="flex flex-col items-center space-y-4 p-6 flex-grow">
        <div className="w-full max-w-2xl space-y-4">
          {taskList.map((ele, index) => (
            <TaskCard
              key={index}
              id={ele.id}
              title={ele.title}
              description={ele.description}
              is_completed={ele.is_completed}
            />
          ))}
        </div>
  
        <button
          onClick={handleCreateNewTask}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create New Task
        </button>
      </main>
  
      {/* Footer */}
      <footer className="w-full bg-white shadow-md py-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Akhilesh Kumar Sharma. All rights reserved.
      </footer>
    </div>
  );
  
  
}

export default App
