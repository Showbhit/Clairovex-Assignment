import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/tasks',
        { title, assigneeId, dueDate, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <input type="text" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} placeholder="Assignee ID" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
