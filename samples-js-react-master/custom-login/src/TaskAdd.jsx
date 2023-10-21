import React from "react";
import { useState } from "react";

function TaskAdd({ onCreate }) {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value)
        console.log(title);
        onCreate(title);
        setTitle('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <div className="">
            <h3 className="">Add a task</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input value={title} onChange={handleChange} type="text" placeholder="Enter task" />
                <button className="" type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default TaskAdd;