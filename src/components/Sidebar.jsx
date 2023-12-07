import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAddTaskClick = () => {
    navigate("/add");
  };

  return (
    <>
      <section className="hidden md:flex flex-col items-center w-[13rem] h-[40rem] border border-slate-300 rounded-md ml-5 mt-[4rem] bg-slate-100 shadow-md">
        <h1 className="text-3xl font-bold font-mono text-gray-600 mt-5 p-[0.5rem]">
          OrganizeMe
        </h1>
        <section className="flex flex-col justify-evenly items-center h-[50%] p-[0.5rem]">
          <button
            className="w-[10rem] h-[3rem] text-2xl font-mono text-gray-600 border border-gray-700 rounded-lg px-5 text-center"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className="w-[10rem] h-[3rem] text-2xl font-mono text-gray-600 border border-gray-700 rounded-lg px-5"
            onClick={handleAddTaskClick}
          >
            Task+
          </button>
        </section>
      </section>
    </>
  );
};

export default Sidebar;
