import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Importing the CSS file

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Client",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", form);
      alert(res.data.message + " (" + res.data.user.role + ")");

      // Navigate based on role
      if (res.data.user.role === "Admin") {
        navigate("/adminPage");
      } else if (res.data.user.role === "Client") {
        navigate("/clientPage");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
