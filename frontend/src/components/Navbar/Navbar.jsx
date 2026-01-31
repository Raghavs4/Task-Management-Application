import "./Navbar.css";
import { logout } from "../../utils/auth";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>Task Manager</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
