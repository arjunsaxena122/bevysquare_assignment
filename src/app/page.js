"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import TodoHeader from "../components/TodoHeader";
import TodoCard from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import TodoDetails from "../components/TodoDetails";
import Pagination from "../components/Pagination";
import { createTodo, getTodo, delTodo, putTodo } from "@/http";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getTodo();
      setTodos(response.data);
      setFilteredTodos(response.data);
    } catch (error) {
      console.log("ERROR: Something went wrong to fetch data..");
    } finally {
      setTimeout(()=>{
        setIsLoading(false);
      },1000)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  }, [searchTerm, todos]);

  const addTodo = async (newTodo) => {
    await createTodo(newTodo);
    getData();
    setShowAddModal(false);
  };

  const updateTodo = async (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo?._id === updatedTodo?._id ? updatedTodo : todo
    );

    await putTodo({
      id: updatedTodo?._id,
      title: updatedTodo?.title,
      description: updatedTodo?.description,
    });
    setTodos(updatedTodos);
    setSelectedTodo(updatedTodo);
  };

  const deleteTodo = async (id) => {
    await delTodo(id);
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
    setSelectedTodo(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Navbar />
        <div className="mt-6 flex flex-col md:flex-row">
          {/* Left side - Todo list */}
          <div
            className={`${
              selectedTodo ? "w-full md:w-1/2 md:pr-4" : "w-full"
            } mb-6 md:mb-0`}
          >
            <TodoHeader
              onAddClick={() => setShowAddModal(true)}
              onSearch={handleSearch}
            />
            <div className="mt-6 space-y-4">
              {isLoading ? (
                <div className="text-white text-center my-40 text-3xl">
                  Loading....
                </div>
              ) : filteredTodos.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-10 text-center">
                  <div className="text-amber-200 text-6xl mb-4">📝</div>
                  <p className="text-gray-400 text-lg">
                    No Todos Available. Click{" "}
                    <span className="font-bold text-amber-200">Add</span> to
                    create one!
                  </p>
                </div>
              ) : (
                currentTodos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo}
                    isSelected={selectedTodo && selectedTodo._id === todo._id}
                    onClick={() => handleSelectTodo(todo)}
                  />
                ))
              )}
            </div>

            {filteredTodos.length > todosPerPage && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>

          {/* Right side - Todo details */}
          {selectedTodo && (
            <div className="w-full md:w-1/2 md:pl-4 md:border-l border-gray-700">
              <TodoDetails
                todo={selectedTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
                onClose={() => setSelectedTodo(null)}
              />
            </div>
          )}
        </div>

        {showAddModal && (
          <AddTodoModal
            onClose={() => setShowAddModal(false)}
            onAdd={addTodo}
          />
        )}
      </div>
    </div>
  );
}
