import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <h2>👨‍💼 Admin Dashboard</h2>
        <ul className="admin-links">
          <li>
            <Link to="/change-password">
              <span className="icon">🔐</span> Change Password
            </Link>
          </li>
          <li>
            <Link to="/todoData">
              <span className="icon">📝</span> Todo Data
            </Link>
          </li>
          <li>
            <Link to="/" className="home-link">
              <span className="icon">📝</span> home page
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
