import { Link } from "react-router-dom";

function ClientPage() {
  return (
    <div className="ClientPage">
      <h2>Client Page</h2>
      <ul>
        <li>
          <Link to="/add">Add Todo</Link>
        </li>
        <li>
          <Link to="/todos">View Todos</Link>
        </li>
        <li>
          <Link to="/profile">User Profile</Link>
        </li>
      </ul>
      <Link to="/" className="home-link">
        <span className="icon">📝</span> home page
      </Link>
    </div>
  );
}

export default ClientPage;
