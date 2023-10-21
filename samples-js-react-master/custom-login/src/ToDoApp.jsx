import React, { useState } from 'react';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';

function ToDoApp() {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [tasks, setTasks] = useState({});
  const tokenStorage = localStorage.getItem("okta-token-storage");
  const parsedTokenStorage = JSON.parse(tokenStorage);
  const oktaBearerToken = parsedTokenStorage.accessToken.accessToken;


  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
      setTasks({});
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        // console.log(userInfo, "UserInfo from ToDoApp");
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const createTask = (title) => {
    if (userInfo) {
      const email = userInfo.email;
      // console.log(email);
      const userTasks = tasks[email] || [];
      // console.log(userTasks);
      const newTask = {
        id: Math.round(Math.random() * 9999),
        title,
      };

      // Make a POST request to your API to create a task
      axios.post('http://localhost:8000/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${oktaBearerToken}`,
        },
      })
        .then((response) => {
          // Assuming your API returns the newly created task
          const createdTask = response.data;

          // Update the tasks object with the new task for this user
          setTasks({ ...tasks, [email]: [...userTasks, createdTask] });
          // console.log(tasks, "From create task function");
        })
        .catch((error) => {
          console.error('Error creating a task:', error);
        });
    }
  };


  // const deleteTaskById = (id) => {
  //   if (userInfo) {
  //     // Create a copy of the user's tasks and update it
  //     const email = userInfo.email;
  //     const userTasks = tasks[email] || [];
  //     const updatedTasks = userTasks.filter((task) => task.id !== id);

  //     // Update the tasks object with the updated tasks for this user
  //     setTasks({ ...tasks, [email]: updatedTasks });
  //     // console.log(tasks, "From delete task function");
  //   }
  // }

  // const editTaskById = (id, newTitle) => {
  //   if (userInfo) {
  //     // Create a copy of the user's tasks and update it
  //     const email = userInfo.email;
  //     const userTasks = tasks[email] || [];
  //     const updatedTasks = userTasks.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, title: newTitle };
  //       }
  //       return task;
  //     });

  //     // Update the tasks object with the updated tasks for this user
  //     setTasks({ ...tasks, [email]: updatedTasks });
  //     // console.log(tasks, "From edit task function");
  //   }
  // }

  const deleteTaskById = (id) => {
    if (userInfo) {
      // Make a DELETE request to your API to delete the task by ID
      axios
        .delete(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${oktaBearerToken}`,
          },
        })
        .then(() => {
          // Assuming your API successfully deletes the task
          // You can remove the task from your state
          const email = userInfo.email;
          const userTasks = tasks[email] || [];
          const updatedTasks = userTasks.filter((task) => task.id !== id);
  
          // Update the tasks object with the updated tasks for this user
          setTasks({ ...tasks, [email]: updatedTasks });
        })
        .catch((error) => {
          console.error('Error deleting the task:', error);
        });
    }
  };

  const editTaskById = (id, newTitle) => {
    if (userInfo) {
      // Make a PUT request to your API to update the task by ID
      axios
        .put(`http://localhost:8000/api/tasks/${id}`, { title: newTitle }, {
          headers: {
            Authorization: `Bearer ${oktaBearerToken}`,
          },
        })
        .then((response) => {
          // Assuming your API successfully updates the task
          const updatedTask = response.data;
  
          // Create a copy of the user's tasks and update it
          const email = userInfo.email;
          const userTasks = tasks[email] || [];
          const updatedTasks = userTasks.map((task) => {
            if (task.id === id) {
              return { ...task, title: updatedTask.title };
            }
            return task;
          });
  
          // Update the tasks object with the updated tasks for this user
          setTasks({ ...tasks, [email]: updatedTasks });
        })
        .catch((error) => {
          console.error('Error editing the task:', error);
        });
    }
  };

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

