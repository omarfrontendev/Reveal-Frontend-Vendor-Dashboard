// import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// 💡 Protect routes and redirect if not authenticated
export function ProtectedRoute({ children }: { children: ReactNode }) {
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken")

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
