import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./SpecialRoutes/ProtectedRoute";
import DisabledRoute from "./SpecialRoutes/DisabledRoute";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Container component="main" maxWidth="md">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <DisabledRoute>
                <Login />
              </DisabledRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <DisabledRoute>
                <Signup />
              </DisabledRoute>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
