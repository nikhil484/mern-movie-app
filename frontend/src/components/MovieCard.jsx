// import {Card,CardMedia,CardContent,Typography,Button,Stack} from "@mui/material";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api.js";

// const MovieCard = ({ movie, refresh }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const deleteMovie = async () => {
//     if (!window.confirm("Delete this movie?")) return;
//     await API.delete(`/movies/${movie._id}`);
//     refresh();
//   };

//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="300"
//         image={movie.poster}
//         alt={movie.title}
//       />
//       <CardContent>
//         <Typography variant="h6">{movie.title}</Typography>
//         <Typography variant="body2">{movie.description}</Typography>
//         <Typography>⭐ {movie.rating}</Typography>

//         {user?.role === "admin" && (
//           <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//             <Button
//               size="small"
//               variant="outlined"
//               onClick={() => navigate(`/admin/edit/${movie._id}`)}
//             >
//               Edit
//             </Button>

//             <Button
//               size="small"
//               color="error"
//               variant="contained"
//               onClick={deleteMovie}
//             >
//               Delete
//             </Button>
//           </Stack>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default MovieCard;

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const MovieCard = ({ movie, refresh }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const deleteMovie = async () => {
    if (!window.confirm("Delete this movie?")) return;
    await API.delete(`/movies/${movie._id}`);
    refresh();
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      {/* Poster */}
      <Box
        sx={{
          height: 220,
          overflow: "hidden",
        }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.description}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          ⭐ {movie.rating}
        </Typography>

        {user?.role === "admin" && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/admin/edit/${movie._id}`)}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={deleteMovie}
            >
              Delete
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
