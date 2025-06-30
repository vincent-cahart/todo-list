import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoFilters = () => {
  const { filter, setFilter, sortBy, setSortBy } = useTodoContext();

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900">
          Filtrer les tâches
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all">Toutes les tâches</option>
          <option value="active">Tâches actives</option>
          <option value="completed">Tâches terminées</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-900">
          Trier par
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="date">Date d'échéance</option>
          <option value="priority">Priorité</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilters; 