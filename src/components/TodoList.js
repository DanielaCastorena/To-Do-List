import './App.css';
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TaskFormModal from './TaskFormModal';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid'; 
import { db } from './firebase'; 
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './Login';  
import { Timestamp } from 'firebase/firestore'; 

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [currentTask, setCurrentTask] = useState(null);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        try {
          const tasksSnapshot = await getDocs(collection(db, 'users', user.uid, 'tasks'));
          const userTasks = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(userTasks);  
        } catch (error) {
          console.error("Error fetching tasks from Firestore:", error);
        }
      } else if (localStorage.getItem('guest')) {
        const localTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
        setTasks(localTasks);
      }
    };
    fetchTasks();
  }, [user]);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('guestTasks', JSON.stringify(updatedTasks));
  };

  const addTask = async (newTask) => {
    try {
      if (!user || !user.uid) {
        console.error("User is not logged in or UID is missing");
        return;
      }
      const taskData = {
        ...newTask,
        id: uuidv4(),
        date: newTask.date ? Timestamp.fromDate(new Date(newTask.date)) : null,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await addDoc(collection(db, 'users', user.uid, 'tasks'), taskData);
      setModalOpen(false);
    } catch (error) {
      console.error("Error in addTask:", error);
    }
  };

  const toggleComplete = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      try {
        if (user) {
          const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);
          await updateDoc(taskRef, { completed: !task.completed });
        } else {
          const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          setTasks(updatedTasks);
          saveTasksToLocalStorage(updatedTasks);
        }
      } catch (error) {
        console.error("Error toggling task:", error);
      }
    }
  };

  const removeTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks); 

    try {
      if (user) {
        await deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId));
      } else {
        saveTasksToLocalStorage(updatedTasks);
      }
    } catch (error) {
      console.error("Error deleting task: ", error);
      setTasks(tasks);
    }
  };

  const getFilteredTasks = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return tasks.filter((task) => {
      const taskDate = task.date ? format(new Date(task.date), 'yyyy-MM-dd') : null;
      switch (filter) {
        case 'today':
          return taskDate === today;
        case 'scheduled':
          return taskDate && new Date(task.date) > new Date();
        case 'completed':
          return task.completed;
        case 'notCompleted':
          return !task.completed;
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
      case 'today':
        return 'No tasks for today!';
      case 'scheduled':
        return 'No scheduled tasks!';
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
        <option value="today">Today</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not Completed</option>
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
