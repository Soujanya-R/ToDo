import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaHandPointDown } from "react-icons/fa";




import { FaEdit } from "react-icons/fa";


export default function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState("")

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handlechange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const ToggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <div className="align-center justify-center  ">
      <h1 className="md:container md:min-w-full bg-black text-white align-center justify-center flex  text-5xl h-20 py-4 gap-5 w-full">
        To-Do List <LuListTodo className='size-19' />

      </h1>
      <div className="p-4 justify-center align-middle flex  ">
        <div className="bg-slate-700 text-white p-7 md:w-4/5 flex-col items-center justify-center flex h-full rounded-3xl min-h-full">
          <div className="px-5px text-3xl justify-center align-middle font-serif ">
            List Your To Dos here
          </div>


          <div className='flex m-4'>
            <input onChange={handlechange} value={todo} type="text" className="border rounded-lg w-80 border-black text-black " />
            <button onClick={handleAdd} disabled={todo.length < 2} className="m-1 bg-slate-900 text-white border border-black rounded-lg px-1 text-lg disabled:bg-slate-600 hover:text-slate-400 hover:text-xl hover:duration-200 
          ">
              <div className='flex gap-3 justify-center align-middle font-bold'>Add<MdPlaylistAdd className='size-8' /></div>
            </button></div>


          <div className='flex  m-2'><input onChange={ToggleFinished} type="checkbox" checked={showFinished} />Show-finished</div>
          <h2 className="text-3xl flex my-4 px-0 py-0 font-serif"><FaHandPointDown className='size-10' />

            Your ToDos</h2>
          {todos.length == 0 && <div>Nothing to display</div>}
          {todos.map((item) => (

            (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center justify-between w-1/3" >
              <div className='flex gap-3'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" value={item.isCompleted} id='' />
                <div className=''> <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div></div>
              </div>
              <div className="todos flex  ">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="m-1 bg-slate-900 text-white border border-black rounded-lg px-4 text-sm hover:text-slate-400"><FaEdit className='size-5' />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="m-1 bg-slate-900 text-white border border-black rounded-lg px-4 text-sm hover:text-slate-400"><RiDeleteBin5Fill className='size-5' /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
