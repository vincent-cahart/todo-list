import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo, addNote } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityBadgeColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pas de date';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      return 'Date invalide';
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(todo.id, newNote.trim());
      setNewNote('');
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center p-4 border-b">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="ml-4 flex-1">
          <h5 className={`text-xl font-bold tracking-tight text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </h5>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm text-gray-600">
              Échéance : {formatDate(todo.dueDate)}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getPriorityBadgeColor(todo.priority)}`}>
              {todo.priority === 'high' ? 'Priorité haute' : 
               todo.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
            </span>
          </div>
        </div>
      </div>

      {todo.notes && (
        <div className="p-4 border-b bg-gray-50">
          <h6 className="text-sm font-medium text-gray-900 mb-2">Notes :</h6>
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-600">{todo.notes}</pre>
        </div>
      )}

      <div className="p-4">
        {isEditing ? (
          <form onSubmit={handleAddNote} className="space-y-3">
            <div>
              <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900">
                Nouvelle note
              </label>
              <textarea
                id="note"
                rows="3"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ajouter une note..."
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Ajouter une note
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem; 