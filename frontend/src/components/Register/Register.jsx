import "./Register.css";
import { apiRequest } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await apiRequest("/auth/register", "POST", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      });

      if (data.token) {
        alert("Registration successful! Please login.");
        navigate("/"); // 🔥 redirect to login
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account ✨</h2>
        <p className="auth-subtitle">Sign up to start managing your tasks</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input name="name" type="text" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input name="email" type="email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input name="password" type="password" required />
          </div>

          <button className="auth-btn">Register</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
