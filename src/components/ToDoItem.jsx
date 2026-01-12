import {Button} from "./Button.jsx";
import {useState} from "react";

export function ToDoItem(props) {
    const { item, handleDelete, handleComplete } = props;
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = (id) => {
        setIsDeleting(true);
        setTimeout(() => {
            handleDelete(id);
        }, 300);
    };

    return (
        <>
            <li key={item.id} className={`todo-item ${item.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
                <span className="todo-text">{item.text}</span>
                <div className="actions">
                    <Button id={item.id} isCompleted={item.completed} action={handleComplete}/>
                    <Button id={item.id} isDeleted={true} action={onDelete}/>
                </div>
            </li>
        </>
    )
}