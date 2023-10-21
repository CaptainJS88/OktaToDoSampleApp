import React from "react";
import { useState } from "react";

function TaskAdd({ onCreate }) {
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
        <div className="">
            <h3 className="">Add a task</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input onChange={handleChange} value={title}/>
                <button className="" type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default TaskAdd;
