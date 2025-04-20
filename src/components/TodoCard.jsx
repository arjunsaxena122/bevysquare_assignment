"use client";

import { useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

export default function TodoCard({ todo, isSelected, onClick }) {

    const currentdata = new Date(todo.date)
    const date = currentdata.toLocaleDateString("en-US", {month: "short", day: "numeric", year:"numeric"})

  return (
    <div
      className={`px-6 py-4 bg-gray-800 rounded-xl shadow-lg cursor-pointer transition-all
        ${isSelected ? "ring-2 ring-amber-400 transform scale-[1.02]" : "hover:bg-gray-750"}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium ${isSelected ? "text-amber-400" : "text-white"}`}>
          {todo.title}
        </h3>
        <div className="bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-300 flex items-center">
          <FiClock className="mr-1" />
          {date}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm line-clamp-2">
        {todo.description}
      </p>
      
      <div className="mt-3 flex items-center">
        <div className={`h-2 w-2 rounded-full ${isSelected ? "bg-amber-400" : "bg-gray-500"} mr-2`}></div>
        <span className="text-xs text-gray-400">
          {isSelected ? "Selected" : "Click to view details"}
        </span>
      </div>
    </div>
  );
}