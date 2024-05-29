import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBox from './components/SearchBox';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks.length) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: uuidv4() };
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.includes(searchQuery) || task.description.includes(searchQuery)
  );

  return (
      <div className="app-container">
      <div className="column">
        <h1>Todo List</h1>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoForm addTask={addTask} />
      </div>
      <div className="column">
        <TodoList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default App;
