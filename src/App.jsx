import { useEffect, useState } from "react";
import Home from "./components/Home";
import Addtodo from "./components/Addtodo";
import UpdateTodo from "./components/UpdateTodo";
import TodoItem from "./components/TodoItem";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initDB } from "./services/indexedDB"; // Import the initDB function

const App = () => {
  const [isDBInitialized, setIsDBInitialized] = useState(false);

  useEffect(() => {
    // Initialize the database when the component mounts
    initDB()
      .then(() => {
        console.log("Database initialized successfully");
        setIsDBInitialized(true);
      })
      .catch((error) => {
        console.error("Error initializing database:", error);
        setIsDBInitialized(false);
      });
  }, []);

  if (!isDBInitialized) {
    // Wait until the database is initialized
    return null;
  }

  return (
    <div className="bg-slate-200 w-[100vw] h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Addtodo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
          <Route path="/todo/:id" element={<TodoItem />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
