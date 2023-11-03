import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { UserContext } from "./context/UserContext";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import User from "./components/User";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          {!isLoggedIn && (
            <NavLink to="/" className="nav-link" activeclassname="active-link">
              Register
            </NavLink>
          )}
          <NavLink to="/login" className="nav-link" activeclassname="active-link">
            {isLoggedIn ? 'Logout' : 'Login'}
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/user" className="nav-link" activeclassname="active-link">
              User
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/reservation" className="nav-link" activeclassname="active-link">
              Reservation
            </NavLink>
          )}
        </Toolbar>
      </AppBar>

      <div className="app-container">
        <Container width="lg" className="main-container">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
