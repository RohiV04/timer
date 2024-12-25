import React, { useState } from "react";
import axios from "axios";

export const CreateTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTimer, setTaskTimer] = useState(0);

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:9000/tasks", {
        name: taskName,
        description: taskDescription,
        timer: taskTimer,
      });
      setTaskName("");
      setTaskDescription("");
      setTaskTimer(0);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Create Task</h2>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Description:</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Timer (seconds):</label>
        <input
          type="number"
          value={taskTimer}
          onChange={(event) => setTaskTimer(event.target.value)}
          style={inputStyle}
        />
      </div>
      <button onClick={handleCreate} style={buttonStyle}>Create Task</button>
    </div>
  );
};

const formContainerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9'
};

const formGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};