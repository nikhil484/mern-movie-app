import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import API from "../services/api.js";
import MovieCard from "../components/MovieCard.jsx";

const AdminManageMovies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies", {
        params: {
          page: 1,
          limit: 50, 
        },
      });
      
      setMovies(res.data.movies || []);
    } catch (err) {
      console.error("Failed to fetch admin movies", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ p: 2 }}>
        Manage Movies
      </Typography>

      <Grid container spacing={2} p={2}>
        {movies.map((movie) => (
          <Grid item xs={12} md={3} key={movie._id}>
            <MovieCard movie={movie} refresh={fetchMovies} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AdminManageMovies;
