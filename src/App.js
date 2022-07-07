import React ,{useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'
import style from './style.scss'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {setTodos(storedTodos)}
    console.log(storedTodos)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addTodo() {
    const name = todoNameRef.current.value

    if (name === '') {return console.log(`You must enter a task`)}
    
    setTodos (prevTodos => {
        return ([...prevTodos, {id : uuidv4(), name: name, complete: false}])
      })

    todoNameRef.current.value = null
  }
  
    function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function TaskTodo(todo) {
    const task = todos.filter(todo => !todo.complete).length

    if ( task !== 0) {
      return <div className='taskToComplete'>You have {todos.filter(todo => !todo.complete).length} task to complete</div>

    }
    return <div className='taskToComplete'>Congratulation !!! You have complete all of your task</div>

  }

  return (
    <>
      <header>
        <input ref={todoNameRef} type="text" placeholder='Enter a new task'/>
        <div className='buttonsContainer'>
          <button onClick={addTodo}><p>Add a Todo</p></button>
          <button onClick={clearTodos}><p>Clear Completed Task</p></button>
        </div>
        <TaskTodo />

      </header>

      <main >
        <div className='taskContainer'>
          <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
        
      </main>

    
    </>
  );
}

export default App;
