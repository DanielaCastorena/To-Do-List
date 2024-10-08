import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { format, isValid } from 'date-fns';

const TodoItem = ({ task, onRemove, onComplete, onEdit }) => {
  const formatTime = (timeString) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (timePattern.test(timeString)) {
      const [hour, minute] = timeString.split(':');
      const formattedHour = hour % 12 || 12;
      const ampm = hour < 12 ? 'am' : 'pm';
      return `${formattedHour}:${minute} ${ampm}`;
    } else {
      console.error('Invalid time format:', timeString);
      return '';
    }
  };

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      console.error("Invalid date value:", date);
      return "";
    }
    return format(new Date(date), 'MM/dd/yyyy');
  };

  const details = [];
  if (task.date) {
    const parsedDate = new Date(task.date);
    if (isValid(parsedDate)) {
      details.push(format(parsedDate, 'MMM dd, yyyy'));
    }
  }
  if (task.time) {
    const formattedTime = formatTime(task.time);
    if (formattedTime) details.push(formattedTime);
  }
  
  if (task.location) details.push(task.location);
  
  const detailsText = details.join(' | ');

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onComplete}
        className="task-checkbox"
      />
      <div className="task-content">
        <span className="task-text" onClick={onComplete}>{task.text}</span>
        {detailsText && <span className="task-details">{detailsText}</span>}
      </div>
      <span className="edit-icon" onClick={() => onEdit(task)}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </span>
      <button className="remove-btn" onClick={onRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default TodoItem;
