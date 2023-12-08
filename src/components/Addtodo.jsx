import { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../services/indexedDB";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [label, setLabel] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAddTodo = async () => {
    // Basic form validation
    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = "Title cannot be empty";
    }

    if (!description.trim()) {
      validationErrors.description = "Description cannot be empty";
    }

    if (!dueDate) {
      validationErrors.dueDate = "Due Date cannot be empty";
    }

    // Reset previous errors
    setErrors(validationErrors);

    // Set default label to "low" if not provided by the user
    const newLabel = label.trim() === "" ? "low" : label;

    // Continue with adding the todo
    const newTodo = {
      title,
      description,
      dueDate,
      label: newLabel,
      isChecked,
    };

    // Use IndexedDB to add the todo
    try {
      const addedTodo = await addTodo(newTodo);
      console.log("Todo added:", addedTodo);
      navigate("/");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <Layout>
        <form className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
          {errors.title && (
            <div className="text-red-500 font-bold mb-2">{errors.title}</div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Todo Title
            </label>
            <input
              className={`${
                errors.title ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {errors.description && (
            <div className="text-red-500 font-bold mb-2">
              {errors.description}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Todo Description
            </label>
            <input
              className={`${
                errors.description ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              placeholder="Enter todo description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {errors.dueDate && (
            <div className="text-red-500 font-bold mb-2">{errors.dueDate}</div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <input
              className={`${
                errors.dueDate ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {errors.label && (
            <div className="text-red-500 font-bold mb-2">{errors.label}</div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Label
            </label>
            <select
              className={`${
                errors.label ? "border-red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="mid">Mid</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Completed
              <input
                type="checkbox"
                className="ml-2"
                value={isChecked}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </form>
      </Layout>
    </>
  );
};

export default AddTodo;
