import { Box, Typography, IconButton, Collapse, Rating } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../services/api.js";

const UserMovieRow = ({ movie, rank }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [myRating, setMyRating] = useState(null);

    const hasRated =
        !!user &&
        movie.ratings?.some(
            (r) => String(r.user) === String(user.id || user._id)
        );

    const handleRate = async (value) => {
        setMyRating(value);
        await API.post(`/movies/${movie._id}/rate`, { value });
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                p: 2,
                mb: 1,
                borderRadius: 2,
                background: "#fafafa",
            }}
        >

            <Box sx={{ position: "relative" }}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ height: 120, borderRadius: 6 }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        background: "#1976d2",
                        color: "#fff",
                        px: 1,
                        borderRadius: 1,
                        fontWeight: "bold",
                        fontSize: 14,
                    }}
                >
                    #{rank}
                </Box>
            </Box>


            <Box flex={1}>
                <Typography variant="h6">{movie.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                    {new Date(movie.releaseDate).getFullYear()} • {movie.duration} min
                </Typography>


                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    ⭐ {(movie.avgRating || 0).toFixed(1)} (
                    {movie.ratingCount || 0} votes)
                </Typography>




                {user && !hasRated && (
                    <Box sx={{ mt: 1 }}>
                        <Rating
                            max={10}
                            value={myRating}
                            onChange={(e, v) => handleRate(v)}
                        />
                    </Box>
                )}




                <Collapse in={open}>
                    <Typography sx={{ mt: 1 }}>{movie.description}</Typography>
                </Collapse>
            </Box>

            <IconButton onClick={() => setOpen(!open)}>
                <InfoOutlinedIcon />
            </IconButton>
        </Box>
    );
};

export default UserMovieRow;
