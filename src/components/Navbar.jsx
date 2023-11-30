const Navbar = () => {
  return (
    <nav className="w-full h-[4rem] flex justify-center items-center ">
      <input
        type="text"
        id="search"
        placeholder="Search for tasks..."
        className="w-[20rem] h-[2.5rem] border border-gray-400 shadow-md rounded-md bg-transparent px-2"
      />
      <button className="border border-gray-400 shadow-md px-2 h-[2.5rem] rounded-md ml-2">
        Search
      </button>
    </nav>
  );
};

export default Navbar;
