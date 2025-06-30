import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoFilters from './components/TodoFilters';

function App() {
  return (
    <TodoProvider>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Ma Liste de Tâches</h1>
        <AddTodo />
        <TodoFilters />
        <TodoList />
    </div>
    </TodoProvider>
  );
}

export default App;
