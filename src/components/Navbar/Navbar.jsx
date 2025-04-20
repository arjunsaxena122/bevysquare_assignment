"use client"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 mb-8">
      <div className="flex items-center">
        <div className="bg-amber-500 p-2 rounded-lg mr-3">
          <img 
            src="/images/logo.jpeg" 
            alt="logo" 
            className="w-6 h-6"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Todo<span className="text-amber-400">List</span></h1> 
      </div>
    </nav>
  );
}