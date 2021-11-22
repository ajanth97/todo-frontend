import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function DisabledRoute({ children }) {
  const { user } = useUser();
  return !user ? children : <Navigate to="/" />;
}

export default DisabledRoute;
