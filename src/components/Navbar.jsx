// const Navbar = () => {
//   return (
//     <nav className="w-full h-[4rem] flex justify-center items-center ">
//       <input
//         type="text"
//         id="search"
//         placeholder="Search for tasks..."
//         className="w-[20rem] h-[2.5rem] border border-gray-400 shadow-md rounded-md bg-transparent px-2"
//       />
//       <button className="border border-gray-400 shadow-md px-2 h-[2.5rem] rounded-md ml-2">
//         Search
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the home page with the search query as a URL parameter
    navigate(`/home?q=${searchQuery}`);
  };

  return (
    <nav className="w-full h-[4rem] flex justify-center items-center ">
      <input
        type="text"
        id="search"
        placeholder="Search for tasks..."
        className="w-[20rem] h-[2.5rem] border border-gray-400 shadow-md rounded-md bg-transparent px-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="border border-gray-400 shadow-md px-2 h-[2.5rem] rounded-md ml-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </nav>
  );
};

export default Navbar;
