import { useEffect, useState } from 'react'  
import axios from 'axios' 
import { Task } from "../model/task"
import { HOST } from '../constants'; 

function TaskCard(props: Task) {  

  const [id, setId] = useState(props.id);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDescription, setNewDescription] = useState(props.description);
  const [isEditing, setIsEditing] = useState<boolean>(id == 0); 
  const [isDeleted, setIsDeleted] = useState<boolean>(false); 
  const [newIsCompleted, setNewIsCompleted] = useState<boolean>(props.is_completed); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [successMessage, setSuccessMessage] = useState<string>();  
  const [errorMessage, setErrorMessage] = useState<string>();  

  useEffect(()=> { 
  }, [])

  const handleSaveButton = async () => {
 
    try {

      setIsLoading(true);  
      const response = await axios.put(`${HOST}/tasks/${props.id}`,  
        { 
          title: newTitle, 
          description: newDescription, 
          is_completed: newIsCompleted,  
        }
      );
      
      const result = await response.data; 

      setIsLoading(false); 
      setIsEditing(false); 

      if(response.status === 200){
        setSuccessMessage(result.message)
      }else { 
        setErrorMessage("Something Went Wrong"); 
      }
      
    } catch (error) {
      setIsLoading(false); 
      setErrorMessage("Something Went Wrong"); 
      console.log(error); 
    } 
  }


  const handleCreateButton = async () => {
    try {
      setIsLoading(true);  
      const response = await axios.post(`${HOST}/tasks`,  { 
          title: newTitle, 
          description: newDescription, 
          is_completed: newIsCompleted,  
        }
      );
      
      console.log(response);
      

      const result = await response.data;  
      setIsLoading(false);
      setId(result.id); 

      if(response.status === 200){
        setSuccessMessage(result.message)
      }else { 
        setErrorMessage("Something Went Wrong"); 
      }
      
    } catch (error) {
      setIsLoading(false); 
      setErrorMessage("Something Went Wrong"); 
      console.log(error); 
    } 
  }


  const handleDeleteButton = async () => {
    try {
      setIsLoading(true);  
      const response = await axios.delete(`${HOST}/tasks/${props.id}`);
      const result = await response.data;  
      setIsLoading(false);

      if(response.status === 200){
        setSuccessMessage(result.message)
        setIsDeleted(true)
      }else { 
        setErrorMessage("Something Went Wrong"); 
      }
      
    } catch (error) {
      setIsLoading(false); 
      setErrorMessage("Something Went Wrong"); 
      console.log(error); 
    } 
  }

  return (
    <> 
    {  !isDeleted && 
      <div className="max-w-sm m-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <input id="disabled-checkbox" type="checkbox" 
                        value="" 
                        checked={newIsCompleted}
                        disabled={!isEditing}
                        onChange={(e) => setNewIsCompleted(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="disabled-checkbox" className="ms-2 text-gray-800 dark:text-gray-500">Completed</label>
            </div>
  
            {isEditing ? (
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="mb-1 w-full text-2xl text-bold px-2 py-1 border rounded-lg"
                />
            ) : (
                <p className="mb-1 text-2xl tracking-tight text-gray-900">{newTitle}</p>
            )}
            {isEditing ? (
                <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)} 
                    className="mb-3 w-full px-2 py-1 border rounded-lg"
                />
            ) : (
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{newDescription}</p>
            )}  

            {isEditing && id != 0 && (
                <button 
                    type="button"
                    onClick={handleSaveButton}
                    className=" inline-flex items-center py-1 fixed relative right-0 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700">
                    {
                      isLoading &&  
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                    }
                    Save
                </button> 
            )}


            {id == 0 && (
                <button 
                    type="button"
                    onClick={handleCreateButton}
                    className=" inline-flex items-center py-1 fixed relative right-0 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700">
                    {
                      isLoading &&  
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                    }
                    Create Task
                </button> 
            )}

                      
            {id != 0 && (
                <button 
                    type="button"
                    onClick={handleDeleteButton}
                    className=" inline-flex items-center py-1 fixed relative right-0 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700">
                    {
                      isLoading &&  
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                    }
                    Delete 
                </button> 
            )}

            
            <button 
                type="button"
                onClick={() => setIsEditing(prev => !prev)}
                className="py-1 fixed relative right-0 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700">
                {isEditing? "cancel": "edit"}
            </button>  

            {successMessage && 
                <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  {successMessage}
                </div>
                <button type="button" 
                    onClick={() => setSuccessMessage(undefined)}
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
              </div>
            } 


          {errorMessage && 
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                <span className="sr-only">Info</span>
                <div>
                  {errorMessage}
                </div>
                <button type="button" 
                    onClick={() => setErrorMessage(undefined)}
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
              </div>
            } 
      </div>
    }
    </>
  );
}

export default TaskCard;
