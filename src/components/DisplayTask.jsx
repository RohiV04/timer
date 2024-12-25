import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    timer: 0,
    completed: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:9000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleStart = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isRunning: true } : task
      )
    );
  };

  const handlePause = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isRunning: false } : task
      )
    );
  };

  const handleStop = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, isRunning: false, timer: 0 } : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditedTask(task);
  };

  const handleSave = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:9000/tasks/${taskId}`, editedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? response.data : task
        )
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.isRunning ? { ...task, timer: task.timer - 1 } : task
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      {tasks.map((task) => (
        <div key={task._id} className="task" style={taskStyle}>
          {editingTaskId === task._id ? (
            <div>
              <input
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="number"
                name="timer"
                value={editedTask.timer}
                onChange={handleChange}
                style={inputStyle}
              />
              <button onClick={() => handleSave(task._id)} style={buttonStyle}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{task.name}</h2>
              <p>{task.description}</p>
              <p>Timer: {task.timer} seconds</p>
              <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
              <button onClick={() => handleStart(task._id)} style={buttonStyle}>
                Start
              </button>
              <button onClick={() => handlePause(task._id)} style={buttonStyle}>
                Pause
              </button>
              <button onClick={() => handleStop(task._id)} style={buttonStyle}>
                Stop
              </button>
              <button onClick={() => handleEdit(task)} style={buttonStyle}>
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const taskStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "5px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default DisplayTask;