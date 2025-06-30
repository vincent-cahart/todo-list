import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div className="flex flex-col gap-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 italic p-6 bg-gray-50 rounded-lg">
          Aucune tâche pour le moment
        </p>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};

export default TodoList; 