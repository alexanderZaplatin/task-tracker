import {Button} from "./Button.jsx";

export function ToDoItem(props) {
    const { item, handleDelete, handleComplete } = props;
    return (
        <>
            <li key={item.id} className={`todo-item ${item.completed ? 'completed' : ''}`}>
                <span className="todo-text">{item.text}</span>
                <div className="actions">
                    <Button id={item.id} isCompleted={item.completed} action={handleComplete}/>
                    <Button id={item.id} isDeleted={true} action={handleDelete}/>
                </div>
            </li>
        </>
    )
}