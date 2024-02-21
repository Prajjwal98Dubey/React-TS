import { useState } from 'react'
import './App.css'
import { CLOSE_IMG_ICON, CORRECT_IMG_ICON, EDIT_IMG_ICON, REMOVE_IMG_ICON } from './images/image'
function App() {
  const [isModal, setIsModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editModelIndex, setEditModelIndex] = useState(-1)
  const [text, setText] = useState("")
  const[editText,setEditText] = useState("")
  const [tasks, setTasks] = useState(localStorage.getItem("my-todo-list") ? JSON.parse(localStorage.getItem("my-todo-list")) : [])
  const handleAddTaskClick = () => {
    setIsModal(true)
  }
  const handleAddTaskSubmit = () => {
    const newTasks: string[] = tasks ? [...tasks] : []
    newTasks.push(text)
    const localVari: string = JSON.stringify([])
    localStorage.getItem("my-todo-list") ? null : localStorage.setItem("my-todo-list", localVari)
    localStorage.setItem("my-todo-list", JSON.stringify(newTasks))
    setTasks(newTasks)
    setIsModal(false)
    setText("")
  }
  const handleDeleteTask = (index: number) => {
    const newTasks: string[] = tasks.filter((task: string, i: number) => i !== index)
    localStorage.setItem("my-todo-list", JSON.stringify(newTasks))
    setTasks(newTasks)
  }
 const handleEditText=(index:number,txt:string)=>{
  const newTasks:string[] = [...tasks]
  newTasks[index] = txt
  localStorage.setItem("my-todo-list",JSON.stringify(newTasks))
  setTasks(newTasks)
  setEditModal(false)
  setEditText("")
 }
  const handleEditModal = (index: number) => {
    setEditModelIndex(index)
    setEditModal(true)
  }
  return (
    <>
      <div className="text-red-500 flex justify-center pl-10 pt-10 pr-10 text-xl font-bold">MY TODO</div>
      <div className=' relative flex justify-center pl-[15px] pt-4'>
        <div className='text-white p-2 font-semibold rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer' onClick={() => handleAddTaskClick()}>+ Add a new task</div>
        {isModal &&
          <div className=' absolute w-[500px] h-[310px] bg-[#313131] border border-red-500 rounded-lg shadow-sm shadow-red-400 z-10'>
            <img src={CLOSE_IMG_ICON} className='absolute top-2 right-1 p-1 cursor-pointer ' onClick={() => setIsModal(false)} />
            <div className='flex justify-center p-24'>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='w-[400px] h-[45px] text-md pl-2 rounded-lg border border-red-500' />
              <span className='w-[100px] h-[45px] flex justify-center items-center ml-2 bg-red-500 hover:bg-red-600 cursor-pointer rounded-lg text-white font-semibold' onClick={() => handleAddTaskSubmit()}>Add</span>
            </div>
          </div>}
      </div>
      <div className='flex justify-center p-4'>
        <div>
          {typeof (tasks) === 'object' && tasks && tasks.map((task: string, index: number) => (
            <div key={index} className='m-2 flex relative'>
              {editModal && index === editModelIndex && <div className=''>
                <input className='absolute top-0 w-[410px] h-[45px] bg-[#313131] border border-red-500 rounded-lg text-red-500' onChange={(e)=>setEditText(e.target.value)}  />
                <div className='absolute text-red-500 top-3 right-24'><img src={CORRECT_IMG_ICON} alt="loading"  onClick={()=>handleEditText(index,editText)} /></div>
              </div>}
              <div className='w-[400px] h-[50px] rounded-lg border border-red-500 hover:text-white hover:bg-red-500 bg-[#313131] text-red-500 p-2 flex items-center cursor-pointer'>
                {task}
              </div>
              <div className='w-[50px] h-[45px] flex justify-center items-center'><img src={EDIT_IMG_ICON} className='cursor-pointer' alt="loading" onClick={() => handleEditModal(index)} /></div>
              <div className='w-[50px] h-[45px] flex justify-center items-center'><img src={REMOVE_IMG_ICON} className='cursor-pointer' alt="loading" onClick={() => handleDeleteTask(index)} /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App