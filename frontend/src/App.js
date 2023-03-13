import React, { useState, useEffect } from "react";
import { getTasks } from "./api/taskApi";
import TaskList from "./components/TaskList";
import Snackbar from '@mui/material/Snackbar';
import CreateTask from "./components/CreateTask";

function App() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks()
      if( response.data === undefined) {
        setSnackbarMessage("Failed to load Tasks");
        return;
      }
      setTasks(response.data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setSnackbarMessage("Task created successfully");
    setOpen(true);
  };

  const updateExistingTask = (task) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) return task;
        return t;
      })
    );
    setSnackbarMessage("Task Updated successfully");
    setOpen(true);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  return (
    <>
      {loading ?
        <div className="text-center mt-5">Loading...</div> : 
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-5">Task Manager</h1>
            <CreateTask showSnackbar={showSnackbar} tasks={tasks} addTask={addTask} />
        </div>
        <div className="row">
          <div className="col">
            <TaskList showSnackbar={showSnackbar} tasks={tasks} updateExistingTask={updateExistingTask} />
          </div>
        </div>
      </div>
      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default App;