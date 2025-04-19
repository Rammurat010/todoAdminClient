import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css"; // Import the custom CSS

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users/1"); // Replace with actual user ID
        setUser(res.data);
      } catch (err) {
        alert("Error fetching user data");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="user-details">
        {/* User profile picture */}
        <img
          src={user.profile_picture || "https://via.placeholder.com/120"} // Placeholder image if no profile picture is available
          alt="Profile"
          className="user-profile-img"
        />
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {/* Link to Edit Profile */}
      <Link to={`/edit/${user.id}`}>Edit Profile</Link>

      <br />
      <br />

      {/* Link to Client Page */}
      <Link to="/clientPage">Go to Client Page</Link>
    </div>
  );
}

export default UserProfile;
