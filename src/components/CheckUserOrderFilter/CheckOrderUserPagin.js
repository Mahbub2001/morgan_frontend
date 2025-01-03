function CheckOrderUserPagination({ currentPage, totalPages, setCurrentPage }) {
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    return (
      <nav
        className="mt-6 flex items-center justify-center sm:mt-8"
        aria-label="Page navigation example"
      >
        <ul className="flex h-8 flex-wrap items-center justify-center gap-1 sm:gap-2 text-sm">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`ms-0 flex h-8 w-8 items-center justify-center rounded-full border ${
                currentPage === 1
                  ? "border-gray-300 bg-gray-200 text-gray-400"
                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-4 w-4 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
          </li>
  
          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  page === currentPage
                    ? "border-primary-300 bg-primary-50 text-primary-600"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
  
          {/* Next Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                currentPage === totalPages
                  ? "border-gray-300 bg-gray-200 text-gray-400"
                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-4 w-4 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default CheckOrderUserPagination;
  