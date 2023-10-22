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
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]);


  useEffect(() => {
    if (userInfo) {
      axios.get('http://localhost:8000/api/tasks', {
        headers: {
          Authorization: `Bearer ${oktaBearerToken}`,
        },
      })
        .then((response) => {
          const userTasks = response.data.tasks;
          setTasks({ ...tasks, [userInfo.email]: userTasks });
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [userInfo]);

  const createTask = (title) => {
    if (userInfo) {
      const email = userInfo.email;
      const userTasks = tasks[email] || [];
      const newTask = {
        id: Math.round(Math.random() * 9999),
        title,
      };

      axios.post('http://localhost:8000/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${oktaBearerToken}`,
        },
      })
        .then((response) => {
          const createdTask = response.data;
          setTasks({ ...tasks, [email]: [...userTasks, createdTask] });
        })
        .catch((error) => {
          console.error('Error creating a task:', error);
        });
    }
  };

  const deleteTaskById = (id) => {
    if (userInfo) {
      axios
        .delete(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${oktaBearerToken}`,
          },
        })
        .then(() => {
          const email = userInfo.email;
          const userTasks = tasks[email] || [];
          const updatedTasks = userTasks.filter((task) => task.id !== id);

          setTasks({ ...tasks, [email]: updatedTasks });
        })
        .catch((error) => {
          console.error('Error deleting the task:', error);
        });
    }
  };

  const editTaskById = (id, newTitle) => {
    if (userInfo) {
      axios
        .put(`http://localhost:8000/api/tasks/${id}`, { title: newTitle }, {
          headers: {
            Authorization: `Bearer ${oktaBearerToken}`,
          },
        })
        .then((response) => {
          const updatedTask = response.data;
          const email = userInfo.email;
          const userTasks = tasks[email] || [];
          const updatedTasks = userTasks.map((task) => {
            if (task.id === id) {
              return { ...task, id: id, title: updatedTask.title };
            }
            return task;
          });

          setTasks({ ...tasks, [email]: updatedTasks });
        })
        .catch((error) => {
          console.error('Error editing the task:', error);
        });
    }
  };

  if (userInfo) {
    return (
      <><div className="flex-row">
        <div id="todo-greeting">Welcome {userInfo.family_name} !</div>
        <div id="todo-totaltasks">Total Tasks: {tasks[userInfo.email]?.length || 0}</div>
      </div><div id="todo-parent">
          <TaskList user={userInfo} onEdit={editTaskById} onDelete={deleteTaskById} tasks={tasks[userInfo.email] || []} />
          <div className="flex-column">
            <TaskAdd user={userInfo} onCreate={createTask} />
          </div>
        </div></>
    );
  } else {
    return (
      <div>
        <h1>Loading your to do tasks! This shouldn't take too long.</h1>
        <svg height="80" width="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" data-testid="vortex-svg" aria-label="vortex-loading" class="vortex-wrapper" aria-busy="true" role="status"><g transform="translate(50,50)"><g transform="scale(0.7)"><g transform="translate(-50,-50)"><g transform="rotate(137.831 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="360 50 50;0 50 50" keyTimes="0;1" dur="1" keySplines="0.5 0.5 0.5 0.5" calcMode="spline"></animateTransform><path fill="red" d="M30.4,9.7c-7.4,10.9-11.8,23.8-12.3,37.9c0.2,1,0.5,1.9,0.7,2.8c1.4-5.2,3.4-10.3,6.2-15.1 c2.6-4.4,5.6-8.4,9-12c0.7-0.7,1.4-1.4,2.1-2.1c7.4-7,16.4-12,26-14.6C51.5,3.6,40.2,4.9,30.4,9.7z"></path><path fill="green" d="M24.8,64.2c-2.6-4.4-4.5-9.1-5.9-13.8c-0.3-0.9-0.5-1.9-0.7-2.8c-2.4-9.9-2.2-20.2,0.4-29.8 C10.6,25.5,6,36,5.3,46.8C11,58.6,20,68.9,31.9,76.3c0.9,0.3,1.9,0.5,2.8,0.8C31,73.3,27.6,69,24.8,64.2z"></path><path fill="blue" d="M49.6,78.9c-5.1,0-10.1-0.6-14.9-1.8c-1-0.2-1.9-0.5-2.8-0.8c-9.8-2.9-18.5-8.2-25.6-15.2 c2.8,10.8,9.5,20,18.5,26c13.1,0.9,26.6-1.7,38.9-8.3c0.7-0.7,1.4-1.4,2.1-2.1C60.7,78.2,55.3,78.9,49.6,78.9z"></path><path fill="yellow" d="M81.1,49.6c-1.4,5.2-3.4,10.3-6.2,15.1c-2.6,4.4-5.6,8.4-9,12c-0.7,0.7-1.4,1.4-2.1,2.1 c-7.4,7-16.4,12-26,14.6c10.7,3,22.1,1.7,31.8-3.1c7.4-10.9,11.8-23.8,12.3-37.9C81.6,51.5,81.4,50.6,81.1,49.6z"></path><path fill="orange" d="M75.2,12.9c-13.1-0.9-26.6,1.7-38.9,8.3c-0.7,0.7-1.4,1.4-2.1,2.1c5.2-1.4,10.6-2.2,16.2-2.2 c5.1,0,10.1,0.6,14.9,1.8c1,0.2,1.9,0.5,2.8,0.8c9.8,2.9,18.5,8.2,25.6,15.2C90.9,28.1,84.2,18.9,75.2,12.9z"></path><path fill="purple" d="M94.7,53.2C89,41.4,80,31.1,68.1,23.7c-0.9-0.3-1.9-0.5-2.8-0.8c3.8,3.8,7.2,8.1,10,13 c2.6,4.4,4.5,9.1,5.9,13.8c0.3,0.9,0.5,1.9,0.7,2.8c2.4,9.9,2.2,20.2-0.4,29.8C89.4,74.5,94,64,94.7,53.2z"></path></g></g></g></g></svg>
      </div>
    )
  }
}

export default ToDoApp;

