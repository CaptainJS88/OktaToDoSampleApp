import React from 'react';
import TaskShow from './TaskShow'

function TaskList({tasks, onDelete, onEdit}) {
    const renderedTasks = tasks.map((task, index) => {
        return <TaskShow index={index} onEdit={onEdit} onDelete={onDelete} key={task.id} task={task}/>
    })

    if (tasks.length >0) {
        return (
            <div id="todo-tasklist">
           {renderedTasks}
            </div>
        );
    } else {
        return (
            <p>Your task list is empty. Add tasks to the to do list to keep track of them.</p>
        );
    }
   
}

export default TaskList;

