import React from "react";
import { useState } from "react";

function TaskAdd({userInfo, onCreate }) {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(title);
        setTitle('');
    }

    return (
        <div className="todo-taskadd">
            <h2 className="">Add a task</h2>
            <form id="todo-form" onSubmit={handleSubmit}>
                <label>Task Name: </label>
                <input required className="todo-input" placeholder="Type new task name here" onChange={handleChange} value={title}/>
                <button className="todo-button" type="submit">Create a New Task +</button>
            </form>
        </div>
    );
}

export default TaskAdd;
