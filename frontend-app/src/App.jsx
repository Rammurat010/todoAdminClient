import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import EditUserForm from "./components/EditUserForm";
import UserProfile from "./components/UserProfile";
import ChangePassword from "./components/ChangePassword"; // Import the ChangePassword component
import TodoData from "./components/TodoData";
import AdminPage from "./components/AdminPage";
import ClientPage from "./components/ClientPage";

import "./components/Login.css";
import "./components/Register.css";
import "./components/AdminPage.css";
import "./components/ChangePassword.css";
import "./components/TodoData.css";
import "./components/ClientPage.css";
import "./components/TodoForm.css";
import "./components/TodoList.css";
import "./components/UserProfile.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<TodoForm />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/edit/:id" element={<EditUserForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/todoData" element={<TodoData />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/clientPage" element={<ClientPage />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
