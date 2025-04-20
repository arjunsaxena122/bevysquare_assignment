"use client"

import { useState } from 'react';
import { IoSearch, IoAddCircle } from 'react-icons/io5';

export default function TodoHeader({ onAddClick, onSearch }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible && !searchInput) {
      onSearch('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-3 py-2">
      <h2 className="text-2xl font-semibold text-white">My Tasks</h2>
      
      <div className="flex items-center w-full sm:w-auto justify-end gap-3">
        <div className={`relative flex items-center ${searchVisible ? 'w-full sm:w-64' : 'w-auto'}`}>
          {searchVisible && (
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            </div>
          )}
          
          {!searchVisible && (
            <button 
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-300"
              onClick={handleSearchClick}
            >
              <IoSearch className="text-xl" />
            </button>
          )}
          
          {searchVisible && (
            <button
              className="ml-2 text-gray-400 hover:text-white"
              onClick={() => {
                setSearchVisible(false);
                setSearchInput('');
                onSearch('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
        
        <button 
          className="flex items-center bg-gradient-to-r from-amber-500 to-amber-400 text-black px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-amber-500/20 transition-all"
          onClick={onAddClick}
        >
          <IoAddCircle className="mr-2 text-xl"/>
          Add Task
        </button>
      </div>
    </div>
  );
}