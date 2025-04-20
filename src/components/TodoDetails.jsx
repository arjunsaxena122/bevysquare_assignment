"use client"

import { useState } from 'react';
import { IoClose, IoTrashOutline, IoSaveOutline, IoCalendarOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';

export default function TodoDetails({ todo, onUpdate, onDelete, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onUpdate({
        ...todo,
        title,
        description
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(todo._id);
  };

  return (
    <div className="h-full p-6 bg-gray-800 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-amber-400">Task Details</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
        >
          <IoClose className="text-xl" />
        </button>
      </div>

      <div className="space-y-6">
        {isEditing ? (
          <>
            <div>
              <label className="block text-gray-400 mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 h-40 resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">Date Created</label>
              <div className="flex items-center text-gray-300">
                <IoCalendarOutline className="mr-2" />
                {todo.date || "Not available"}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Title</h3>
              <p className="text-xl font-medium text-white">{todo.title}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Description</h3>
              <p className="text-white whitespace-pre-wrap">{todo.description}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Date Created</h3>
              <div className="flex items-center text-white">
                <IoCalendarOutline className="mr-2 text-amber-400" />
                {todo.date || "Not available"}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-3 pt-4 justify-between sm:justify-start">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="flex items-center px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium"
              >
                <IoSaveOutline className="mr-2" />
                Save Changes
              </button>
              
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setTitle(todo.title);
                  setDescription(todo.description);
                }}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center px-5 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-black font-medium"
              >
                <FiEdit2 className="mr-2" />
                Edit Task
              </button>
              
              <button 
                onClick={handleDelete}
                className="flex items-center px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
              >
                <IoTrashOutline className="mr-2" />
                Delete Task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}