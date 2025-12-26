// import { useEffect, useState } from "react";
// import { Grid, Typography } from "@mui/material";
// import API from "../services/api.js";
// import MovieCard from "../components/MovieCard.jsx";

// const AdminManageMovies = () => {
//   const [movies, setMovies] = useState([]);

//   const fetchMovies = async () => {
//     try {
//       const res = await API.get("/movies", {
//         params: {
//           page: 1,
//           limit: 50, 
//         },
//       });
      
//       setMovies(res.data.movies || []);
//     } catch (err) {
//       console.error("Failed to fetch admin movies", err);
//       setMovies([]);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   return (
//     <>
//       <Typography variant="h5" sx={{ p: 2 }}>
//         Manage Movies
//       </Typography>

//       <Grid container spacing={2} p={2}>
//         {movies.map((movie) => (
//           <Grid item xs={12} md={3} key={movie._id}>
//             <MovieCard movie={movie} refresh={fetchMovies} />
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default AdminManageMovies;

import { useEffect, useState } from "react";
import { Grid, Typography, Box, Divider } from "@mui/material";
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
    <Box
      sx={{
        maxWidth: 1300,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 3,
      }}
    >
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Manage Movies
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Edit or delete movies from your catalog
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

     
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={movie._id}
            sx={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <MovieCard movie={movie} refresh={fetchMovies} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminManageMovies;

