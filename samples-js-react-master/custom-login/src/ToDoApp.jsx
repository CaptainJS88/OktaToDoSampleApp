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
              // Make sure to include the 'id' property in the updated task
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
    return <div>Loading To-Do Lists...</div>;
  }
}

export default ToDoApp;

