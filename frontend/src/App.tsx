import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./styles.css";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const { state: authState } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={authState.user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/stats"
              element={authState.user ? <Stats /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!authState.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authState.user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
