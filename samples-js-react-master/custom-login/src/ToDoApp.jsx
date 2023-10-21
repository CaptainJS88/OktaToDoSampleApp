import React, { useState } from 'react';
import TaskAdd from './TaskAdd';

function ToDoApp() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title) => {
    console.log("Need to ask task with title:", title);
  }
  return (
    <div id="todo-parent">
      <TaskAdd onCreate={createTask}/>
    </div>
  )
}

export default ToDoApp;

