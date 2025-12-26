import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api.js";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            required
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            required
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            required
            onChange={handleChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
