import React, { useState, useEffect } from 'react';

const TaskFormModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.text || '');
      if (taskToEdit.date) {
        const dateObj = new Date(taskToEdit.date);
        const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
        setDate(localDate.toISOString().split('T')[0]);
        setTime(localDate.toISOString().split('T')[1].substring(0, 5));
      } else {
        setDate('');
        setTime('');
      }
      setTime(taskToEdit.time || '');
      setLocation(taskToEdit.location || '');
      setDescription(taskToEdit.description || '');
    } else {
      setTask('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (task.trim()) {
      let isoString = '';
      if (date) {
        const dateString = date + (time ? 'T' + time : 'T00:00');
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) {
          console.error('Invalid date:', dateString);
          return;
        }
        isoString = dateObj.toISOString();
      }
      onSave({
        text: task,
        date: isoString || null,
        time: time || null,
        location,
        description,
        completed: taskToEdit ? taskToEdit.completed : false,
      });
      onClose();
      setTask('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => {
              console.log('Date changed:', e.target.value);
              setDate(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          <input
            type="time"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="modal-buttons">
            <button onClick={handleSave}>Save Task</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskFormModal;
