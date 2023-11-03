import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Typography, TextField, Button, Container, Box } from "@mui/material";

function Login() {
  const { loginUser, logoutUser, isLoggedIn, loggedInUser, loginError } =
    useContext(UserContext);

  const initialForm = { email: "", password: "" };
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogout = () => {
    logoutUser();
    setFormData(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
    } catch (error) {
      console.log(error);
    }
    setFormData(initialForm);
  };

  return (
    <Container maxWidth="m" className="login-container">
      <Typography variant="h3" >
        {isLoggedIn ? 'Ausloggen' : 'Anmeldung'}
      </Typography>
      {isLoggedIn ? (
        <Box>
          <Typography variant="body1">Anmeldung erfolgreich! Willkommen {loggedInUser.name}</Typography>
          <br />
          <Button onClick={handleLogout} variant="outlined">
            Ausloggen
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            variant="outlined"
            fullWidth
            required
            autoComplete="username"
            margin="dense"
          />
          <TextField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Passwort"
            variant="outlined"
            fullWidth
            required
            autoComplete="current-password"
            margin="dense"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Senden
          </Button>
          {loginError && (
            <Typography variant="body2" color="error" align="center">
              {loginError}
            </Typography>
          )}
        </form>
      )}
    </Container>
  );
}

export default Login;
