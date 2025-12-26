import express from "express";
import {
  getMovies,
  searchMovies,
  sortMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  rateMovie
} from "../controllers/movieController.js";

import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
//router.get("/sorted", sortMovies);

router.post("/", auth, admin, upload.single("poster"), addMovie);
router.put("/:id", auth, admin, updateMovie);
router.delete("/:id", auth, admin, deleteMovie);
router.post("/:id/rate", auth, rateMovie);

export default router;
