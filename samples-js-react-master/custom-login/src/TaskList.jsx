import React, { useEffect, useState } from 'react';
import TaskShow from './TaskShow'

function TaskList({tasks, onDelete}) {
    const renderedTasks = tasks.map((task) => {
        return <TaskShow onDelete={onDelete} key={task.id} task={task}/>
    })
    return (
        <div id="todo-tasklist">
       {renderedTasks}
        </div>
    );
}

export default TaskList;

