// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
