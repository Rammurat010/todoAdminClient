import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TodoForm() {
  const [form, setForm] = useState({
    title: "",
    due_date: "",
    category: "",
    priority: "Low",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/todos", form);
      alert("Todo added successfully");
    } catch (err) {
      alert("Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Add Todo</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <input name="due_date" type="date" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <select name="priority" onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" onChange={handleChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add</button>

      {/* Navigate to adminPage */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/clientPage">Go to client Page</Link>
      </div>
    </form>
  );
}

export default TodoForm;
