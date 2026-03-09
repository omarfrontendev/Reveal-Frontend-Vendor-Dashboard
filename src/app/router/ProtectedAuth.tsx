// import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// 💡 Protect routes and redirect if not authenticated
export function ProtectedAuth({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("authToken")

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
