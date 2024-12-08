import { useState,useEffect } from 'react'
import './App.css'

const getLocalTask=()=>{
  const lists =localStorage.getItem("mytodoList")

  if(lists){
    return JSON.parse(lists)
  }else{
    return []
  }
}

function App() {
  const [getValue, setGetValue]=useState('')
  const [tasks ,setTasks]=useState(getLocalTask())
  const [toggleButton,setToggleButton] =useState(true)
  const [editId, setEditId] = useState(null);



  const inputChange=(e)=>{
    setGetValue(e.target.value)
  }

  const addTask=()=>{
    if(!getValue){
      alert('plz fill the data')
    }else if(getValue && !toggleButton){
      setTasks(tasks.map((element)=>{
        if(element.id==editId){
          return {...element, work:getValue}
          
        }
        return element
      }))
      setGetValue('')
      setEditId()
      setToggleButton(true)
    }
    else{
      const myInputData={
        id:new Date().getTime().toString(),
        work:getValue
      }
      setTasks([...tasks,myInputData])
      setGetValue('')
      setToggleButton(true)
    }



  }

  const deleteTask=(i)=>{
    const updatedItem=tasks.filter((item)=>{
      return item.id !==i
    })
    setTasks(updatedItem)
  }

  const editTask=(i)=>{
    const taskToEdit = tasks.find((task) => task.id === i)
    if (taskToEdit) {
      setGetValue(taskToEdit.work); 
      setToggleButton(false); 
      setEditId(i); 
    }
  }

  useEffect(()=>{
    localStorage.setItem('mytodoList',JSON.stringify(tasks))
  },[tasks])

  return (
    <>
  
    <h1 className='heading'>Bucket List</h1>
    <div className="container">
    <div className="input-add-box">
    <input type="text" name="" placeholder='...✍ write here' value={getValue} className='input-box' onChange={inputChange} />
    <button className='add-button-style'> {toggleButton ? <i className="fa-solid fa-plus icon-size" onClick={addTask}></i> : <i className="fa-solid fa-pen-to-square icon-size" onClick={addTask}></i> }</button>
    </div>

    
    <div className="tasks-list">
        {tasks.slice().reverse().map((task) => (
          <div className="task-box">
          <div key={task.id} className="write-task">
            {task.work}
          </div>
          <div className='icon-box'>
            <i className="fa-solid fa-pen-to-square " onClick={()=>editTask(task.id)}></i>
            <i className="fa-solid fa-trash delete-style" onClick={()=>deleteTask(task.id)}></i>
            </div> 
          </div>
        ))}
      </div>

    </div>
  
    </>
  )
}

export default App

