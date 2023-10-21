import React, { useEffect, useState } from 'react';

function TaskShow({task, onDelete}) {

    const handleDeleteClick = () => {
        onDelete(task.id);
    }
    
    return (
        <div id="todo-taskshow">
            {task.title}
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default TaskShow;

