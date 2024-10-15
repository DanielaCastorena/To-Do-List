import './App.css';
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TaskFormModal from './TaskFormModal';
import { isToday, isAfter } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = () => {
      const localTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
      setTasks(localTasks);
    };
    fetchTasks();
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('guestTasks', JSON.stringify(updatedTasks));
  };

  const addTask = async (newTask) => {
    try {
      if (currentTask) {
        const updatedTasks = tasks.map((task) =>
          task.id === currentTask.id ? { ...task, ...newTask } : task
        );
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
      } else {
        const taskData = {
          ...newTask,
          id: uuidv4(),
          completed: false,
        };
        const updatedTasks = [...tasks, taskData];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
      }
      setModalOpen(false);
      setCurrentTask(null); 
    } catch (error) {
      console.error("Error in addTask:", error);
    }
  };
  

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const getFilteredTasks = () => {
    const today = new Date();
    return tasks.filter((task) => {
      const taskDate = task.date ? new Date(task.date) : null;
      switch (filter) {
        case 'completed':
          return task.completed;
        case 'notCompleted':
          return !task.completed;
        case 'scheduled':
          return taskDate && isAfter(taskDate, today);
        case 'today':
          return taskDate && isToday(taskDate);
        default:
          return true;
      }
    });
  };

  const getEmptyMessage = () => {
    switch (filter) {
      case 'completed':
        return 'No tasks completed yet!';
      case 'notCompleted':
        return 'All tasks complete!';
      case 'scheduled':
        return 'No tasks scheduled!';
      case 'today':
        return 'No tasks today!';
      default:
        return "No tasks yet!";
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="todo-list">
      <h2>Dashboard</h2>
      <hr className="custom-hr" />
      <button
        className="add-task-btn"
        onClick={() => {
          setCurrentTask(null);
          setModalOpen(true);
        }}
      >
        <span>+</span>
      </button>

      <select
        className="filter-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not Completed</option>
        <option value="scheduled">Scheduled</option>
        <option value="today">Today</option>
      </select>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onRemove={() => removeTask(task.id)}
              onComplete={() => toggleComplete(task.id)}
              onEdit={() => {
                setCurrentTask(task);
                setModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="empty-board-message">{getEmptyMessage()}</div>
        )}
      </ul>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setCurrentTask(null);
        }}
        onSave={addTask}
        taskToEdit={currentTask}
        key={isModalOpen ? 'new' : currentTask?.id}
      />
    </div>
  );
};

export default TodoList;
