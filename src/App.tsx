import { useState } from 'react' 
import './App.css'

function App() { 
  const [taskList, setTaskList] = useState(["asdfads", 'asdfasdf']);

  return (
    <>
      <h1>Hey</h1>
      {taskList.map((ele, index) => (
        <p className='' key={index}>{ele}</p>
      ))}
    </>
  )
}

export default App
