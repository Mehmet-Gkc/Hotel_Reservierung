import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const initialForm = { name: "", email: "", password: "" };

function Register() {
  const { createUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("form", formData);
      createUser(formData);
      setSuccessMessage("Registration completed successfully!");
      setFormData(initialForm);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="m">
      <Typography variant="h3" gutterBottom>
        Registrieren
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          id="name"
          name="name"
          margin="dense"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Passwort"
          variant="outlined"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="dense"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Senden
        </Button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Typography>
          Du hast schon einen Account? <Link to="/login">Anmeldung</Link>
        </Typography>
      </div>
      {successMessage && (
        <Typography variant="body1" align="center" color="primary" style={{ marginTop: '1rem' }}>
          {successMessage}
        </Typography>
      )}
    </Container>
  );
}

export default Register;
