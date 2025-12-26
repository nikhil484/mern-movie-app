import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api.js";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  // useEffect(() => {
  //   API.get("/movies").then((res) => {
  //     const movie = res.data.find((m) => m._id === id);
  //     setForm(movie);
  //   });
  // }, [id]);
  useEffect(() => {
  const fetchMovie = async () => {
    const res = await API.get(`/movies/${id}`);
    setForm(res.data);
  };

  fetchMovie();
}, [id]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/movies/${id}`, form);
    navigate("/admin/manage");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3 }}>
        <Typography variant="h5">Edit Movie</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form?.title || ""}
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form?.description || ""}
            margin="normal"
            onChange={handleChange}
          />


          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Movie
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminEditMovie;
