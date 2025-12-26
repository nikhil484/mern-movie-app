import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        background:
          "linear-gradient(90deg, #1a237e 0%, #3949ab 100%)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 🔷 Left: Logo + Main Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            🎬 MovieDB
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/search"
            sx={{ textTransform: "none" }}
          >
            Search
          </Button>

          {user?.role === "admin" && (
            <Button
              color="inherit"
              component={Link}
              to="/admin/add"
              sx={{
                textTransform: "none",
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                },
              }}
            >
              Add Movie
            </Button>
          )}

          {user?.role === "admin" && (
            <Button
              color="inherit"
              component={Link}
              to="/admin/manage"
              sx={{
                textTransform: "none",
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                },
              }}
            >
              Manage Movies
            </Button>
          )}
        </Box>

        {/* 🔶 Right: User Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && (
            <>
              <Avatar
                sx={{
                  bgcolor: "#ffb300",
                  width: 32,
                  height: 32,
                  fontSize: 14,
                }}
              >
                {user.email?.[0]?.toUpperCase()}
              </Avatar>

              <Typography variant="body2">
                {user.role === "admin" ? "Admin" : "User"}
              </Typography>
            </>
          )}

          {user ? (
            <Button
              variant="outlined"
              color="inherit"
              onClick={logout}
              sx={{
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                backgroundColor: "#ffb300",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#ffa000",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
