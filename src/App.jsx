import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);
  // useEffect(() => {
  //   // savetoLs();
  //  // let todostring=localStorage.getItem("todos");
 
  //   console.log(todostring);
  //   if(todostring){
  //     let todos=JSON.parse(localStorage.getItem("todos"));
  //     setTodos(todos); 

  //   }
  
 
  // }, [])
 
  

  const savetoLs =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished=(e)=>{
    setshowFinished(!showFinished);
 }
  const handleEdit =(e,id)=>{
     let t=todos.filter(i=>i.id===id);
     setTodo(t[0].todo);
     let newTodos=todos.filter((item)=>{
      return item.id!==id;
    })

    setTodos(newTodos);
    // savetoLs();
  }
  const handleDelete =(e,id)=>{

    let newTodos=todos.filter((item)=>{
      return item.id!==id;
    })

    setTodos(newTodos);
  //  savetoLs();
  }
  const handleAdd =()=>{
        setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}]);
        setTodo("")
      //  savetoLs();
        let aa=todos.filter((i)=> i.id===id);
        // if(aa.length===0)savetoLs();




















  }
  const handleChange =(e)=>{
   setTodo(e.target.value);
  }
  const handleCheckbox =(e)=>{
    let id=e.target.name;
    //console.log(id);
    let idx=todos.findIndex((item)=>{
      return id===item.id
    })

    let newTodos=[...todos];
    newTodos[idx].isCompleted=!newTodos[idx].isCompleted;
    setTodos(newTodos);
    // savetoLs();



  }
  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:w-[35%] bg-violet-100 my-5 rounded-xl p-5 md:mx-auto min-h-[80vh]">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your Todos at one place</h1>
      <div className="addtodo my-5 ">
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <div className='flex gap-2'>

        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md '>Save</button>
        </div>
      </div>
       <input onChange={toggleFinished} type="checkbox"  checked={showFinished}/>Show finished
      <h2 className='text-lg font-bold'>Todos</h2>
      <div className="todos">
        {todos.length===0 && <div className='m-5'>No todos to display</div>}
        {todos.map(item=>{

       
        return(showFinished || !item.isCompleted) &&  <div key={item.id} className={"todo w-full flex  justify-between my-3"}>
          <div className='flex gap-5 '>
          <input name={item.id} onChange={handleCheckbox} type="checkbox"  id="" />
          <div className='p-1 overflow-hidden'>
          <div className={item.isCompleted? "line-through":""}>{item.todo}</div>
         </div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
          </div>
        </div>
         })}
      </div>
    </div>
    </>
  )
}

export default App
