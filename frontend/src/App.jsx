import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [auth, setAuth] = useState(isAuthenticated());

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            auth ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={auth ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
