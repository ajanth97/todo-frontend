import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
