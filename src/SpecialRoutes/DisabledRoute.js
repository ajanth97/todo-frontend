import { Navigate } from "react-router-dom";

function DisabledRoute({ children }) {
  //const isAuth = localStorage.getItem("isAuth");
  const isAuth = true;
  return !isAuth ? children : <Navigate to="/" />;
}

export default DisabledRoute;
