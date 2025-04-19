import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((res) => setTodos(res.data))
      .catch(() => alert("Failed to load todos"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>
      <Link
        to="/clientPage"
        style={{ marginBottom: "10px", display: "inline-block" }}
      >
        Go to Client Page
      </Link>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.due_date}</td>
              <td>{todo.category}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
