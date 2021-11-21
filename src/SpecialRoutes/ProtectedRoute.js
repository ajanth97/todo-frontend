import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  //const isAuth = localStorage.getItem("isAuth");
  const isAuth = true;
  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
