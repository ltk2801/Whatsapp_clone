import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import io from "socket.io-client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./components/Notifications/ToastContainer";
import { useSelector } from "react-redux";
import SocketContext from "./context/SocketContext";

// socket io

const socket = io(process.env.REACT_APP_API);

function App() {
  const { user } = useSelector((state) => state.user);
  const { access_token } = user;
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <ToastContainer />
          <Routes>
            <Route
              exact
              path="/"
              element={access_token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!access_token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!access_token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
