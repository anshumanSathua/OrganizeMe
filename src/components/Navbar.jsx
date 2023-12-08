import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleAddTaskClick = () => {
    setIsMenuOpen(false);
    navigate("/add");
  };

  const clickHandler = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="w-full h-[8rem] md:h-[4rem] flex flex-col md:flex-row justify-center items-center relative">
      {/* Part 1: Heading and Burger Menu (Visible on mobile screens only) */}
      <div className="md:hidden flex items-center w-full p-2">
        <h1
          className="text-xl font-bold text-gray-600 mb-2 pl-2"
          onClick={clickHandler}
        >
          OrganizeMe
        </h1>
        {/* Burger menu icon */}
        <div
          className="text-gray-600 cursor-pointer ml-auto pr-1"
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Part 2: Search Bar and Button (Visible on all screens) */}
      <div className="flex flex-row justify-center items-center w-full">
        {/* Search bar */}
        <input
          type="text"
          id="search"
          placeholder="Search for tasks..."
          className="w-[15rem] md:w-[20rem] h-[2.5rem] md:h-[2.5rem] border border-gray-400 shadow-md rounded-md bg-transparent px-2"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search button */}
        <button
          className="border border-gray-400 shadow-md px-2 h-[2.5rem] rounded-md ml-1 md:ml-2"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-36 h-36 bg-slate-100 border border-gray-300 shadow-md py-2 px-4 z-10 rounded-md">
          <button
            className="block w-full text-center text-lg text-slate-600 mb-3"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className="block w-full text-center text-lg text-slate-600 mb-3"
            onClick={handleAddTaskClick}
          >
            Task+
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
