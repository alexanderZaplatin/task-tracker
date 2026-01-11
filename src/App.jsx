import { useState, createRef } from 'react'
import './App.css'
import {ToDoItem} from "./components/ToDoItem.jsx";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a ToDo App', completed: true },
  ]);

  const todoRef = createRef();

  function handleAdd(text) {
      if (!text) {
          return;
      }

      setTodos(curTodos => [...curTodos, { id: curTodos.length + 1, text }]);

      todoRef.current.value = '';
  }

  function handleDelete(id) {
      setTodos(curTodos => curTodos.filter(todo => todo.id !== id));
  }

  function handleComplete(id) {
      setTodos(curTodos => curTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  return (
    <div className="todo-container">
      <h1>My Tasks</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Add a new task..."
          ref={todoRef}
          onKeyPress={e => e.key === 'Enter' && handleAdd(todoRef.current.value)}
        />
        <button className="add-btn" onClick={() => handleAdd(todoRef.current.value)}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
            <ToDoItem key={todo.id} item={todo} handleComplete={handleComplete} handleDelete={handleDelete}/>
        ))}
      </ul>
    </div>
  )
}

export default App
