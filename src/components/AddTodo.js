import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { Datepicker } from "flowbite-react";

const AddTodo = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('medium');

  const formatDateForDisplay = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Convertir la date en format ISO string sans l'heure et le fuseau horaire
      const formattedDate = dueDate ? new Date(dueDate.setHours(0, 0, 0, 0)).toISOString() : '';
      addTodo(text.trim(), formattedDate, priority);
      setText('');
      setDueDate(null);
      setPriority('medium');
    }
  };

  const handleDateChange = (date) => {
    // Réinitialiser l'heure à minuit
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      setDueDate(newDate);
    } else {
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div>
        <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900">
          Nouvelle tâche
        </label>
        <input
          type="text"
          id="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Que devez-vous faire ?"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Date d'échéance
          </label>
          <Datepicker
            language="fr-FR"
            value={dueDate}
            onSelectedDateChanged={handleDateChange}
            minDate={new Date()}
            placeholder="Sélectionnez une date"
            formatDate={formatDateForDisplay}
            displayFormat="dd/MM/yyyy"
            showClearButton={false}
          />
        </div>

        <div>
          <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">
            Priorité
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Ajouter la tâche
      </button>
    </form>
  );
};

export default AddTodo; 