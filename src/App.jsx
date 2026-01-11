import { useState, createRef } from 'react'
import './App.css'
import {ToDoItem} from "./components/ToDoItem.jsx";

function App() {
  const todoRef = createRef();
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a ToDo App', completed: true },
    { id: 3, text: 'Refactor the app', completed: false },
    { id: 4, text: 'Explore Next.js', completed: false },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'completed') return todo.completed;
      if (filter === 'not-completed') return !todo.completed;
  });

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

  function filterTodos(event) {
      setFilter(event.target.value);
  }

  const notCompletedTasks = filteredTodos.filter(todo => !todo.completed);
  const completedTasks = filteredTodos.filter(todo => todo.completed);

  return (
    <div className="todo-container">
      <h1>Task Tracker</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="What needs to be done?"
          ref={todoRef}
          onKeyPress={e => e.key === 'Enter' && handleAdd(todoRef.current.value)}
        />
        <button className="add-btn" onClick={() => handleAdd(todoRef.current.value)}>Add Task</button>
      </div>

        <select name="select" aria-label="Filter Tasks" value={filter} onChange={filterTodos}>
            <option value="all">Show All Tasks</option>
            <option value="completed">Completed Only</option>
            <option value="not-completed">To Do Only</option>
        </select>

      <div className="todo-columns">
          <div className="todo-column">
              <h2>To Do - {notCompletedTasks.length}</h2>
              <ul className="todo-list">
                  {notCompletedTasks.map((todo) => (
                      <ToDoItem key={todo.id} item={todo} handleComplete={handleComplete} handleDelete={handleDelete}/>
                  ))}
              </ul>
          </div>
          <div className="todo-column">
              <h2>Completed - {completedTasks.length}</h2>
              <ul className="todo-list">
                  {completedTasks.map((todo) => (
                      <ToDoItem key={todo.id} item={todo} handleComplete={handleComplete} handleDelete={handleDelete}/>
                  ))}
              </ul>
          </div>
      </div>
    </div>
  )
}

export default App
