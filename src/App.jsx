import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { ToDoItem } from "./components/ToDoItem.jsx";

const STORAGE_KEY = 'todos';
const INITIAL_TASKS = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a ToDo App', completed: true },
    { id: 3, text: 'Refactor the app', completed: false },
    { id: 4, text: 'Explore Next.js', completed: false },
];

function App() {
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_TASKS;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    useEffect(() => localStorage.clear(), []);

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === 'completed') return todo.completed;
            if (filter === 'not-completed') return !todo.completed;
            return true;
        });
    }, [todos, filter]);

    const handleAdd = () => {
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };

        setTodos(prev => [...prev, newTodo]);
        setInputValue('');
    };

    const handleDelete = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const activeTasks = filteredTodos.filter(todo => !todo.completed);
    const completedTasks = filteredTodos.filter(todo => todo.completed);

    return (
        <div className="todo-container">
            <h1>Task Tracker</h1>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
                <button className="add-btn" onClick={handleAdd}>Add Task</button>
            </div>

            <select aria-label="Filter Tasks" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Show All Tasks</option>
                <option value="completed">Completed Only</option>
                <option value="not-completed">To Do Only</option>
            </select>

            <div className="todo-columns">
                {activeTasks.length > 0 &&
                    <div className="todo-column">
                        <h2>To Do - {activeTasks.length}</h2>
                        <ul className="todo-list">
                            {activeTasks.map((todo) => (
                                <ToDoItem
                                    key={todo.id}
                                    item={todo}
                                    handleComplete={handleToggleComplete}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    </div>
                }
                {completedTasks.length > 0 &&
                    <div className="todo-column">
                        <h2>Completed - {completedTasks.length}</h2>
                        <ul className="todo-list">
                            {completedTasks.map((todo) => (
                                <ToDoItem
                                    key={todo.id}
                                    item={todo}
                                    handleComplete={handleToggleComplete}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;