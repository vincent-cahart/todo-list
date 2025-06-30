import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    // Récupérer les todos du localStorage au chargement
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Normaliser les dates au chargement
      return parsedTodos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt ? new Date(todo.createdAt).toISOString() : '',
        dueDate: todo.dueDate ? new Date(new Date(todo.dueDate).setHours(0, 0, 0, 0)).toISOString() : ''
      }));
    }
    return [];
  });

  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'priority'

  useEffect(() => {
    // Sauvegarder les todos dans le localStorage à chaque modification
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, dueDate, priority) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: dueDate ? new Date(new Date(dueDate).setHours(0, 0, 0, 0)).toISOString() : '',
        priority, // 'high', 'medium', 'low'
        notes: ''
      }
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    // Normaliser la date si elle est mise à jour
    const normalizedUpdates = {
      ...updates,
      dueDate: updates.dueDate ? new Date(new Date(updates.dueDate).setHours(0, 0, 0, 0)).toISOString() : updates.dueDate
    };
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...normalizedUpdates } : todo
    ));
  };

  const addNote = (id, note) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, notes: todo.notes + (todo.notes ? '\n' : '') + note } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'date') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const value = {
    todos: sortedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addNote,
    filter,
    setFilter,
    sortBy,
    setSortBy
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}; 