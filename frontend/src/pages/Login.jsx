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
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.role);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          Dont have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
