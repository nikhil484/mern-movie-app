import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import API from "../services/api.js";

const AdminAddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
   // rating: "",
    releaseDate: "",
    duration: "",
  });

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );
      if (poster) formData.append("poster", poster);

      await API.post("/movies", formData);
      alert("Movie added successfully");

      
      setForm({
        title: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
      });
      setPoster(null);
      setPreview(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Add New Movie
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Duration (minutes)"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Release Date"
                    name="releaseDate"
                    value={form.releaseDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ height: "56px" }}
                  >
                    Upload Poster
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>

                {preview && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={preview}
                        alt="Poster Preview"
                        style={{
                          height: 250,
                          borderRadius: 8,
                          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                  >
                    {loading ? "Adding Movie..." : "Add Movie"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminAddMovie;
