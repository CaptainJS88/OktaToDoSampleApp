import React, { useState } from 'react';
import TaskEdit from './TaskEdit';

function TaskShow({ task, onDelete, onEdit }) {
    const [showEdit, setShowEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleDeleteClick = () => {
        onDelete(task.id);
    }

    const toggleEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleEditSubmit = () => {
        onEdit(task.id, newTitle);
        setShowEdit(false);
    }

    return (
        <div id="todo-taskshow">
            {showEdit ? (
                <div>
                    <form onSubmit={handleEditSubmit}>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <button type="submit">Save</button>
                    </form>
                </div>
            ) : (
                <h3>{task.title}</h3>
            )}
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default TaskShow;
