import { useEffect, useState } from "react";
import { TextField, Grid, MenuItem, Box } from "@mui/material";
import API from "../services/api.js";
import UserMovieRow from "../components/UserMovieRow.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [releaseRange, setReleaseRange] = useState("all");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies", {
        params: {
          q: query || undefined,
          sortBy: sortBy || undefined,
          order: order || undefined,
          releaseRange: releaseRange || undefined,
          page: 1,
          limit: 20,
        },
      });


      setMovies(res.data.movies || []);
    } catch (err) {
      console.error("Search fetch failed", err);
      setMovies([]);
    }
  };


  useEffect(() => {
    const delay = setTimeout(fetchMovies, 300);
    return () => clearTimeout(delay);
  }, [query, sortBy, order, releaseRange]);

  return (
    <Box p={2}>

      <TextField
        fullWidth
        label="Search by name or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />


      <Box display="flex" gap={2} mb={3} flexWrap="wrap">

        <TextField
          select
          label="Rating"
          value={sortBy === "rating" ? order : ""}
          onChange={(e) => {
            setSortBy("rating");
            setOrder(e.target.value);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="asc">Low → High</MenuItem>
          <MenuItem value="desc">High → Low</MenuItem>
        </TextField>


        <TextField
          select
          label="Duration"
          value={sortBy === "duration" ? order : ""}
          onChange={(e) => {
            setSortBy("duration");
            setOrder(e.target.value);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="asc">Short → Long</MenuItem>
          <MenuItem value="desc">Long → Short</MenuItem>
        </TextField>


        <TextField
          select
          label="Release Date"
          value={releaseRange}
          onChange={(e) => setReleaseRange(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="week">Last Week</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
          <MenuItem value="sixMonths">Last 6 Months</MenuItem>
          <MenuItem value="year">Last Year</MenuItem>
        </TextField>
      </Box>


      <Grid container spacing={2}>
        {movies.map((movie) => (
          <UserMovieRow key={movie._id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
