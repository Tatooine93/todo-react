import React from 'react'


export default function Todo({todo, toggleTodo}) {

    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    return (
    <div className={todo.name} style={{background: todo.complete ? "#008000" : 'transparent'}} >
        <label >
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}    
        </label>
    </div>
    );
}
