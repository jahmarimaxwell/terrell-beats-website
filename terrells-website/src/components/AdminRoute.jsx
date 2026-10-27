
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking permissions...</p>;
  }

  if (!user) {
    return <Navigate to="/signIn" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
