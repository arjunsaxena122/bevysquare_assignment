"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Logic to show a reasonable number of page buttons
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        &laquo;
      </button>
      
      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-amber-500 text-black font-medium"
              : page === "..."
              ? "bg-transparent text-gray-400 cursor-default"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        &raquo;
      </button>
    </div>
  );
}