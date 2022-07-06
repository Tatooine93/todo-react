import React ,{useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'

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

  function addTodo() {
    const name = todoNameRef.current.value

    if (name === '') {return console.log(`You must enter a task`)}
    
    setTodos (prevTodos => {
        return ([...prevTodos, {id : uuidv4(), name: name, complete: false}])
      })

    todoNameRef.current.value = null
  }
  
  return (
    <>
      <input ref={todoNameRef} type="text"/>
      <button onClick={addTodo}>Add a Todo</button>
      <button>Clear Completed Task</button>
      <TodoList todos={todos}/>
      <div>{todos.length} left to do</div>
    </>
  );
}

export default App;
