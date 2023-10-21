import React, { useState } from 'react';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';

function ToDoApp() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title) => {
    console.log("Need to add a task with title:", title);
    const newTasks = [
      ...tasks,
      {
        id: Math.round(Math.random() * 9999),
        title,
      },
    ];
    setTasks(newTasks);
    console.log(newTasks,"newTasks");
  }

  const deleteTaskById = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedTasks);
  }

  return (
    <div id="todo-parent">
      Total Tasks: {tasks.length}
      <TaskList onDelete={deleteTaskById} tasks={tasks} />
      <TaskAdd onCreate={createTask} />
    </div>
  )
}

export default ToDoApp;

