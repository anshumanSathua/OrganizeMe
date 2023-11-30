// import Home from "./components/Home";
// import Addtodo from "./components/Addtodo";
// import TodoItem from "./components/TodoItem";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { initDB } from "./indexedDB"; // Import the initDB function

// const App = () => {
//   const test = {
//     id: 1,
//     title: "my todo",
//     description: "my description",
//     dueDate: "25/11/36",
//     label: "ny label",
//     isChecked: false,
//   };
//   return (
//     <div className="bg-slate-200 w-[100vw] h-[100vh]">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/add" element={<Addtodo />} />
//           <Route path="/todo" element={<TodoItem todo={test} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// App.jsx

import { useEffect, useState } from "react";
import Home from "./components/Home";
import Addtodo from "./components/Addtodo";
import TodoItem from "./components/TodoItem";
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
          <Route path="/todo/:id" element={<TodoItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
