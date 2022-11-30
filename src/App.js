import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import SignUp from "./components/session/Signup";
import Login from "./components/session/Login";
import Home from "./components/session/Home";
import Menu from "./components/session/Menu";
import MeetUs from "./components/session/MeetUs";
import Help from "./components/session/Help";

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
            <Route path="/meet.us" element={<MeetUs />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
