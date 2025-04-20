"use client"

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function AddTodoModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd({ 
        title, 
        description,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-amber-400">Create New Task</h2>
          <button
            className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
            onClick={onClose}
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-2 font-medium">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-gray-300 mb-2 font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-32 resize-none"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 rounded-lg text-black font-medium shadow-md"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}