import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import SignUp from "./components/session/Signup";
import Login from "./components/session/Login";
import Home from "./components/session/Home";
import PrivateRoute from "./components/session/PrivateRoute";
import Menu from "./components/session/Menu";
import CreatePublication from "./components/publications/CreatePublication";

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Menu />
          <Routes>
            <Route
              path="/"
              element={
                //<PrivateRoute>
                  <Home />  
                //</PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/create" element={<SignUp />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
