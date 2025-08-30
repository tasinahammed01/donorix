import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "donor" | "recipient" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && auth.user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    if (auth.user.role === "donor") {
      return <Navigate to="/dashboard/donor" replace />;
    } else if (auth.user.role === "recipient") {
      return <Navigate to="/dashboard/recipient" replace />;
    } else if (auth.user.role === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
