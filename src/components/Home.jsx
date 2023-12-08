import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { getTodos } from "../services/indexedDB";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const allTodos = await getTodos();
        setTodos(allTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "Complete":
        return todo.isChecked;
      case "Incomplete":
        return !todo.isChecked;
      case "Low":
        return todo.label === "low";
      case "Mid":
        return todo.label === "mid";
      case "High":
        return todo.label === "high";
      default:
        return true;
    }
  });

  const handleAddTodoClick = () => {
    navigate("/add");
  };

  return (
    <Layout>
      <section className="max-w-md md:w-[800px] h-[500px] bg-slate-100 mx-auto mt-4 rounded-md shadow-md">
        <div className="flex flex-row justify-between items-center md:mx-5 pt-5">
          <button
            onClick={handleAddTodoClick}
            className="border border-gray-400 rounded-md shadow-md w-[8rem] h-[2.5rem] md:w-[10rem] ml-2 md:ml-0 "
          >
            Add+
          </button>
          <div className="relative inline-block bg-slate-100 w-[8rem] md:w-[10rem] md:ml-3 mr-2 md:mr-0 ">
            <select
              className="border border-gray-400 rounded-md shadow-md w-full h-[2.5rem] md:w-[10rem] pl-[2rem] bg-slate-100"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-5 rounded-md shadow-md overflow-hidden">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-white bg-slate-700 border border-gray-700 rounded-md p-[0.5rem]">
              No todos yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-400 m-1">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="text-gray-700 p-[0.5rem] font-semibold hover:bg-gray-100"
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
