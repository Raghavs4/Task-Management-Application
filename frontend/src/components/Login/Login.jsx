import "./Login.css";
import { apiRequest } from "../../api/api";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await apiRequest("/auth/login", "POST", {
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
      setAuth(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Task Management Portal</h2>
        <p className="auth-subtitle">Login to manage your tasks</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="auth-btn">Login</button>
        </form>

        {/* Sign up link */}
        <p className="auth-footer">
          New user?{" "}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
