const DB_NAME = "TodoDB";
const TODO_STORE = "todos";

let db;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(TODO_STORE, { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const addTodo = (todo) => {
  const transaction = db.transaction([TODO_STORE], "readwrite");
  const store = transaction.objectStore(TODO_STORE);
  const request = store.add(todo);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getTodos = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction([TODO_STORE], "readonly");
    const store = transaction.objectStore(TODO_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getTodoById = (id) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction([TODO_STORE], "readonly");
    const store = transaction.objectStore(TODO_STORE);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Function to update a todo
export const updateTodo = async (todoId, updatedFields) => {
  try {
    const db = await openDB();

    // Open a transaction on the "todos" object store with readwrite access
    const transaction = db.transaction([TODO_STORE], "readwrite");

    // Access the "todos" object store
    const objectStore = transaction.objectStore(TODO_STORE);

    // Retrieve the existing todo using its ID
    const existingTodo = await objectStore.get(todoId);

    if (existingTodo) {
      // Update the fields of the existing todo with the provided values
      const updatedTodo = { ...existingTodo, ...updatedFields };

      // Put the updated todo back into the object store
      await objectStore.put(updatedTodo);

      console.log("Todo updated successfully:", updatedTodo);
    } else {
      console.error("Todo not found");
    }

    // Complete the transaction
    await transaction.complete;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Function to delete a todo
export const deleteTodo = (todoId) => {
  return new Promise((resolve, reject) => {
    try {
      openDB().then((db) => {
        const transaction = db.transaction(TODO_STORE, "readwrite");
        const todosStore = transaction.objectStore(TODO_STORE);

        const request = todosStore.delete(todoId);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          reject(new Error("Error deleting todo"));
        };
      });
    } catch (error) {
      reject(error);
    }
  });
};
