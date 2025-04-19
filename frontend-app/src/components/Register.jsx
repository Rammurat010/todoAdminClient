import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the enhanced CSS

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Client",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/register", form);
      alert(res.data.message);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User Icon"
          style={{
            width: "60px",
            display: "block",
            margin: "0 auto 1rem auto",
          }}
        />
        <h2>Register</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
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
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
