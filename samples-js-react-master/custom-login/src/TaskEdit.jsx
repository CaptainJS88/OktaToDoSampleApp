import React, { useState } from 'react';

function TaskEdit({task, onSubmit}) {
    const [title, setTitle] = useState(task.title);

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        onSubmit(task.id, title);
    }

    return (
       <div>
        <form onSubmit={handleEditSubmit}>
            <label>Enter New Title</label>
            <input value={title} onChange={handleChange}></input>
            <button>Save</button>
        </form>
       </div>
    )
}

export default TaskEdit;

