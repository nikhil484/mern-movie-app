

import { useEffect, useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import API from "../services/api.js";
import UserMovieRow from "../components/UserMovieRow.jsx";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MOVIES_PER_PAGE = 5;

  const fetchMovies = async (pageNumber) => {
    const res = await API.get("/movies", {
      params: {
        sortBy: "avgRating",
        order: "desc",
        page: pageNumber,
        limit: MOVIES_PER_PAGE,
      },
    });

    setMovies(res.data.movies);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Top Rated Movies
      </Typography>

      {/* Movie List */}
      {movies.map((movie, index) => (
        <UserMovieRow
          key={movie._id}
          movie={movie}
          rank={(page - 1) * MOVIES_PER_PAGE + index + 1}
        />
      ))}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Home;
