export function Button(props) {
    const { id, isCompleted, isDeleted, action } = props;
    let text;

    if (isDeleted) {
        text = 'Delete';
    } else if (isCompleted) {
        text = 'Undo';
    } else {
        text = 'Done';
    }

    const className = isDeleted ? 'delete-btn' : 'complete-btn';

    return (
        <button className={className} onClick={() => action(id)}>{text}</button>
    )
}