import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ChangePassword.css"; // Import the scoped CSS

function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const userId = 1; // Replace with actual user ID
      const res = await axios.put(
        `http://localhost:3001/users/${userId}/change-password`,
        form
      );
      alert(res.data.message);
      navigate("/profile");
    } catch (err) {
      alert("Password change failed: " + err.response.data.error);
    }
  };

  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit} className="change-password-form">
        <h2>Change Password 🔒</h2>
        <input
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
      </form>

      <Link className="admin-link" to="/adminPage">
        ⬅ Go to Admin Page
      </Link>
    </div>
  );
}

export default ChangePassword;
