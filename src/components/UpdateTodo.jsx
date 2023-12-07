import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import { getTodoById, updateTodo } from "../services/indexedDB";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    label: "",
    isChecked: false,
  });

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const todoDetails = await getTodoById(Number(id));
        setTodo(todoDetails);
      } catch (error) {
        console.error("Error fetching todo details:", error);
      }
    };

    fetchTodoDetails();
  }, [id]);

  const handleUpdateTodo = async () => {
    try {
      await updateTodo(Number(id), todo);
      // Redirect to the todo details page after successful update
      navigate(`/todo/${id}`);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Layout>
      <form className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Todo Title
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter todo title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Todo Description
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter todo description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
        </label>
        <input
          type="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={todo.dueDate}
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Label
        </label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          value={todo.label}
          onChange={(e) => setTodo({ ...todo, label: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Completed
            <input
              type="checkbox"
              className="ml-2"
              checked={todo.isChecked}
              onChange={() => setTodo({ ...todo, isChecked: !todo.isChecked })}
            />
          </label>
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleUpdateTodo}
        >
          Update Todo
        </button>
      </form>
    </Layout>
  );
};

export default UpdateTodo;
