import {Card,CardMedia,CardContent,Typography,Button,Stack} from "@mui/material";
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
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={movie.poster}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">{movie.description}</Typography>
        <Typography>⭐ {movie.rating}</Typography>

        {user?.role === "admin" && (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
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
