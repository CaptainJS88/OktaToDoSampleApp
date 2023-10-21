import React, { useState } from 'react';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

function ToDoApp() {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [tasks, setTasks] = useState({}); // Use an object to map emails to tasks

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When the user isn't authenticated, forget any user info and tasks
      setUserInfo(null);
      setTasks({});
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        console.log(userInfo, "UserInfo from ToDoApp");
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  console.log(userInfo, "User Info");

  const createTask = (title) => {
    if (userInfo) {
      // Create a copy of the user's tasks and update it
      const email = userInfo.email;
      const userTasks = tasks[email] || []; // Get the user's tasks or an empty array
      const newTask = {
        id: Math.round(Math.random() * 9999),
        title,
      };
      const updatedTasks = [...userTasks, newTask];

      // Update the tasks object with the new tasks for this user
      setTasks({ ...tasks, [email]: updatedTasks });
      console.log(tasks, "From create task function");
    }
  }

  const deleteTaskById = (id) => {
    if (userInfo) {
      // Create a copy of the user's tasks and update it
      const email = userInfo.email;
      const userTasks = tasks[email] || [];
      const updatedTasks = userTasks.filter((task) => task.id !== id);

      // Update the tasks object with the updated tasks for this user
      setTasks({ ...tasks, [email]: updatedTasks });
      console.log(tasks, "From delete task function");
    }
  }

  const editTaskById = (id, newTitle) => {
    if (userInfo) {
      // Create a copy of the user's tasks and update it
      const email = userInfo.email;
      const userTasks = tasks[email] || [];
      const updatedTasks = userTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle };
        }
        return task;
      });

      // Update the tasks object with the updated tasks for this user
      setTasks({ ...tasks, [email]: updatedTasks });
      console.log(tasks, "From edit task function");
    }
  }

  if (userInfo) {
    return (
      <div id="todo-parent">
        <h3>Welcome {userInfo.family_name} !</h3>
        <h4>Total Tasks: {tasks[userInfo.email]?.length || 0}</h4>
        <TaskList user={userInfo} onEdit={editTaskById} onDelete={deleteTaskById} tasks={tasks[userInfo.email] || []} />
        <TaskAdd user={userInfo} onCreate={createTask} />
      </div>
    );
  } else {
    return <div>Loading To-Do Lists...</div>;
  }
}

export default ToDoApp;

