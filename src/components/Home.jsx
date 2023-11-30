/* eslint-disable no-unused-vars */
// // import Sidebar from "./Sidebar";
// import Layout from "./Layout";
// import { useState } from "react";

// const Home = () => {
//   const [filter, setFilter] = useState("All");

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   return (
//     <Layout>
//       <section className="w-[800px] h-[500px] bg-white m-auto mt-4 rounded-md shadow-md">
//         <div className="flex justify-between mx-5 pt-5">
//           <button className="border border-gray-400 rounded-md shadow-md w-[10rem]">
//             Add+
//           </button>
//           <div className="relative inline-block text-left">
//             <select
//               className="border border-gray-400 rounded-md shadow-md w-[10rem] h-[2.5rem] pl-[2rem] "
//               value={filter}
//               onChange={(e) => handleFilterChange(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Complete">Complete</option>
//               <option value="Incomplete">Incomplete</option>
//             </select>
//           </div>
//         </div>
//         <div className="w-[700px] m-auto bg-slate-800 h-[10rem] mt-5 rounded-md shadow-md"></div>
//       </section>
//     </Layout>
//   );
// };

// export default Home;

// Home.jsx

// import { useState, useEffect } from "react";
// import Layout from "./Layout";
// import { getTodos } from "../services/indexedDB";

// const Home = () => {
//   const [filter, setFilter] = useState("All");
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     // Fetch todos from IndexedDB when the component mounts
//     const fetchTodos = async () => {
//       try {
//         const allTodos = await getTodos();
//         setTodos(allTodos);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     };

//     fetchTodos();
//   }, []); // Empty dependency array to ensure this effect runs only once

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   return (
//     <Layout>
//       <section className="w-[800px] h-[500px] bg-slate-100 m-auto mt-4 rounded-md shadow-md">
//         <div className="flex justify-between mx-5 pt-5">
//           <button className="border border-gray-400 rounded-md shadow-md w-[10rem]">
//             Add+
//           </button>
//           <div className="relative inline-block bg-slate-100 ">
//             <select
//               className="border border-gray-400 rounded-md shadow-md w-[10rem] h-[2.5rem] pl-[2rem] bg-slate-100"
//               value={filter}
//               onChange={(e) => handleFilterChange(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Complete">Complete</option>
//               <option value="Incomplete">Incomplete</option>
//             </select>
//           </div>
//         </div>
//         <div className="w-[700px] m-auto mt-5 rounded-md shadow-md">
//           {todos.length === 0 ? (
//             <p className="text-gray-700 text-center text-white bg-slate-700 border border-gray-700 rounded-md p-[0.5rem] ">
//               No todos yet.
//             </p>
//           ) : (
//             <ul>
//               {todos.map((todo) => (
//                 <li key={todo.id} className="text-gray-700">
//                   {todo.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Home;

// Home.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { getTodos } from "../services/indexedDB";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch todos from IndexedDB when the component mounts
    const fetchTodos = async () => {
      try {
        const allTodos = await getTodos();
        setTodos(allTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "Complete":
        return todo.isChecked;
      case "Incomplete":
        return !todo.isChecked;
      default:
        return true;
    }
  });

  const handleAddTodoClick = () => {
    // Navigate to the "Add Todo" page
    navigate("/add");
  };

  return (
    <Layout>
      <section className="w-[800px] h-[500px] bg-slate-100 m-auto mt-4 rounded-md shadow-md">
        <div className="flex justify-between mx-5 pt-5">
          <button
            onClick={handleAddTodoClick}
            className="border border-gray-400 rounded-md shadow-md w-[10rem]"
          >
            Add+
          </button>
          <div className="relative inline-block bg-slate-100 ">
            <select
              className="border border-gray-400 rounded-md shadow-md w-[10rem] h-[2.5rem] pl-[2rem] bg-slate-100"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
        <div className="w-[700px] m-auto mt-5 rounded-md shadow-md">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-700 text-center text-white bg-slate-700 border border-gray-700 rounded-md p-[0.5rem]  ">
              No todos yet.
            </p>
          ) : (
            <ul>
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="text-gray-700 p-[0.5rem] font-semibold border"
                >
                  <Link to={`/todo/${todo.id}`} state={{ todo }}>
                    {todo.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
