import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link

function TodoData() {
  const [todos, setTodos] = useState([]); // Store todos
  const [page, setPage] = useState(1); // Track current page
  const [total, setTotal] = useState(0); // Total count of todos
  const limit = 10; // Limit per page

  // Fetch todos on page change
  useEffect(() => {
    fetchTodos();
  }, [page]);

  // Fetch todos data from the backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/todos?page=${page}`
      );
      setTodos(res.data.data); // Set todos to state
      setTotal(res.data.total); // Set total count for pagination
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalPages = Math.ceil(total / limit); // Calculate total pages

  return (
    <div className="App">
      <div className="header-bar">
        <h1>Todo List</h1>
        <Link to="/adminPage">← Back to Admin</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.due_date}</td>
              <td>{todo.category}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        {/* Dynamically generate page numbers */}
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={page === idx + 1 ? "active" : ""}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoData;
