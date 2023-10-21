import React, { useState } from 'react';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';

function ToDoApp() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title) => {
    const newTasks = [
      ...tasks,
      {
        id: Math.round(Math.random() * 9999),
        title,
      },
    ];
    setTasks(newTasks);
  }

  const deleteTaskById = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedTasks);
  }

  const editTaskById = (id, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }
      return task; // Return the task unchanged if it's not the one being edited
    });

    setTasks(updatedTasks);
  }

  return (
    <div id="todo-parent">
      Total Tasks: {tasks.length}
      <TaskList onEdit={editTaskById} onDelete={deleteTaskById} tasks={tasks} />
      <TaskAdd onCreate={createTask} />
    </div>
  )
}

export default ToDoApp;
