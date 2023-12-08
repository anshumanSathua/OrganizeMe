// Search.jsx
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "./Layout";
import { getTodos } from "../services/indexedDB";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const allTodos = await getTodos();
        const filteredResults = allTodos.filter((todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-4 p-4 rounded-md shadow-md bg-slate-100">
        <h2 className="text-xl font-bold mb-2">Search Results</h2>
        {searchResults.length === 0 ? (
          <p className="text-gray-700">No matching todos found.</p>
        ) : (
          <ul>
            {searchResults.map((todo) => (
              <li key={todo.id} className="text-gray-700 border p-2">
                <Link to={`/todo/${todo.id}`} state={{ todo }}>
                  {todo.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Search;
